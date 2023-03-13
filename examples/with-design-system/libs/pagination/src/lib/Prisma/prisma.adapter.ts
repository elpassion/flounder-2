import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import {
  FilterOperator,
  PaginateConfig,
  Paginated,
  PaginateQuery,
  PaginateQueryWithFilter,
  PaginationFacade,
  PrismaPaginateConfig,
} from '../pagination.interfaces';
import { Delegate, ReturnedEntity } from './interfaces';
import { Column, Order, positiveNumberOrDefault, SortBy } from '../helper';
import { stringify } from 'querystring';
import { mapKeys, values } from 'lodash';
import { PaginatedMapper } from '../paginated-mapper';

@Injectable()
export class PrismaAdapter implements PaginationFacade {
  private DEFAULT_MAX_LIMIT = 100;
  private DEFAULT_LIMIT = 20;
  private NO_PAGINATION = 0;

  async paginate<T extends Delegate>(
    query: PaginateQuery,
    prisma: T,
    config: PrismaPaginateConfig<T>
  ): Promise<Paginated<ReturnedEntity<T>>> {
    const page = positiveNumberOrDefault(query.page, 1, 1);

    const defaultLimit = config.defaultLimit ?? this.DEFAULT_LIMIT;
    const maxLimit = positiveNumberOrDefault(
      config.maxLimit,
      this.DEFAULT_MAX_LIMIT
    );
    const queryLimit = positiveNumberOrDefault(query.limit, defaultLimit);

    const isPaginated = !(
      queryLimit === this.NO_PAGINATION && maxLimit === this.NO_PAGINATION
    );

    const limit = isPaginated
      ? Math.min(queryLimit || defaultLimit, maxLimit || this.DEFAULT_MAX_LIMIT)
      : this.NO_PAGINATION;

    const where: Record<string, any> = {};
    const searchBy: Column<ReturnedEntity<T>>[] = [];
    const sortBy: SortBy<ReturnedEntity<T>> = [];

    let path: string;

    const r = new RegExp('^(?:[a-z+]+:)?//', 'i');
    let queryOrigin = '';
    let queryPath = '';
    if (r.test(query.path)) {
      const url = new URL(query.path);
      queryOrigin = url.origin;
      queryPath = url.pathname;
    } else {
      queryPath = query.path;
    }

    if (config.relativePath) {
      path = queryPath;
    } else if (config.origin) {
      path = config.origin + queryPath;
    } else {
      path = queryOrigin + queryPath;
    }

    // @@@@@ searchBy
    if (config.searchableColumns) {
      if (query.searchBy) {
        for (const column of query.searchBy) {
          if (this.isEntityKey(config.searchableColumns, column)) {
            searchBy.push(column);
          }
        }
      } else {
        searchBy.push(...config.searchableColumns);
      }
    }

    if (query.search && searchBy) {
      if (searchBy.length > 1) {
        where['OR'] = [
          // todo: need to check if nested OR properties already exist
          ...(where['OR'] || []),
          ...searchBy.map((column) => ({
            [column]: {
              contains: query.search,
            },
          })),
        ];
      } else {
        where[searchBy[0]] = {
          ...where[searchBy[0]],
          contains: query.search,
        };
      }
    }

    // @@@@@ sortBy
    if (config.sortableColumns.length < 1) {
      console.debug("Missing required 'sortableColumns' config.");
      throw new ServiceUnavailableException();
    }

    if (query.sortBy) {
      for (const order of query.sortBy) {
        if (
          this.isEntityKey(config.sortableColumns, order[0]) &&
          ['ASC', 'DESC'].includes(order[1])
        ) {
          sortBy.push(order as Order<T>);
        }
      }
    }

    if (!sortBy.length) {
      sortBy.push(
        ...((config.defaultSortBy?.map(([column, order]) => [
          column,
          order,
        ]) as SortBy<ReturnedEntity<T>>) || [
          [config.sortableColumns[0], 'ASC'],
        ])
      );
    }

    let orderBy;
    if (config.nullSort) {
      orderBy = sortBy.map(([column, order]) => ({
        [column]: {
          sort: order.toLowerCase(),
          nulls: config.nullSort,
        },
      }));
    } else {
      orderBy = sortBy.map(([column, order]) => ({
        [column]: order.toLowerCase(),
      }));
    }

    // @@@@@@@ FILTER @@@@@@@
    if (query.filter) {
      const filter = PrismaAdapter.parseFilter(
        query as PaginateQueryWithFilter,
        config
      );

      for (const column in filter) {
        where[column] = {
          ...where[column],
          ...filter[column],
        };
      }
    }

    // @@@@@@ CONFIG WHERE @@@@@@@

    if (config.where) {
      for (const column in config.where) {
        const configWhere =
          typeof config.where[column] === 'string'
            ? PrismaAdapter.OperatorSymbolToFunction().get(FilterOperator.EQ)!(
                config.where[column]
              )
            : config.where[column];

        where[column] = {
          ...where[column],
          ...configWhere,
        };
      }
    }

    const paginationConfig = isPaginated
      ? {
          skip: (page - 1) * limit,
          take: limit,
        }
      : {};

    const [items, totalItems] = await Promise.all([
      prisma.findMany({
        where,
        orderBy,
        ...paginationConfig,
      }),
      isPaginated ? await prisma.count({ where }) : Promise.resolve(undefined),
    ]);

    return new PaginatedMapper(
      items,
      {
        page,
        limit,
        path,
        sortBy,
        searchBy: query.searchBy ? searchBy : undefined,
        search: query.search,
        filter: query.filter,
      },
      {
        isPaginated,
        totalItems,
      }
    ).toPaginated();
  }

  isEntityKey<T extends Delegate>(
    entityColumns: Column<ReturnedEntity<T>>[],
    column: string
  ): column is Column<ReturnedEntity<T>> {
    return !!entityColumns.find((c) => c === column);
  }

  static parseFilter<T>(
    query: PaginateQueryWithFilter,
    config: PaginateConfig<T>
  ) {
    const filter: { [columnName: string]: PrismaFindOperator<string> } = {};
    let filterableColumns = config.filterableColumns;
    if (filterableColumns === undefined) {
      console.debug("No 'filterableColumns' given, ignoring filters.");
      filterableColumns = {};
    }
    for (const column of Object.keys(query.filter)) {
      if (!(column in filterableColumns)) {
        continue;
      }
      const allowedOperators = filterableColumns[
        column as Column<T>
      ] as FilterOperator[];
      const input = query.filter[column];
      const statements = !Array.isArray(input) ? [input] : input;
      for (const raw of statements) {
        const tokens = PrismaAdapter.getFilterTokens(raw);
        if (tokens.length === 0) {
          continue;
        }
        const [op2, op1, value] = tokens;

        if (!PrismaAdapter.isOperator(op1) || !allowedOperators.includes(op1)) {
          continue;
        }
        if (PrismaAdapter.isOperator(op2) && !allowedOperators.includes(op2)) {
          continue;
        }
        if (PrismaAdapter.isOperator(op1)) {
          switch (op1) {
            case FilterOperator.BTW:
              filter[column] = PrismaAdapter.OperatorSymbolToFunction().get(
                op1
              )!(
                ...PrismaAdapter.tryTransformStringArrayToNumbers(
                  (value as string).split(',')
                )
              );
              break;
            case FilterOperator.LT:
            case FilterOperator.LTE:
            case FilterOperator.GT:
            case FilterOperator.GTE:
              filter[column] = PrismaAdapter.OperatorSymbolToFunction().get(
                op1
              )!(
                PrismaAdapter.tryTransformStringArrayToNumbers([
                  value as string,
                ])[0]
              );
              break;
            case FilterOperator.IN:
              filter[column] = PrismaAdapter.OperatorSymbolToFunction().get(
                op1
              )!(
                PrismaAdapter.tryTransformStringArrayToNumbers(
                  (value as string).split(',')
                )
              );
              break;
            default:
              filter[column] =
                PrismaAdapter.OperatorSymbolToFunction().get(op1)!(value);
              break;
          }
        }
        if (PrismaAdapter.isOperator(op2)) {
          filter[column] = PrismaAdapter.OperatorSymbolToFunction().get(op2)!(
            filter[column]
          );
        }
      }
    }
    return filter;
  }

  static tryTransformStringArrayToNumbers(
    array: string[]
  ): number[] | string[] {
    try {
      return array.map((element) => {
        const number = Number(element);

        if (isNaN(number)) {
          throw new Error();
        }

        return number;
      });
    } catch {
      return array;
    }
  }

  static getFilterTokens(raw: string): (string | null)[] {
    const tokens = [];
    const matches = raw.match(/(\$\w+):/g);

    if (matches) {
      const value = raw.replace(matches.join(''), '');
      tokens.push(
        ...matches.map((token) => token.substring(0, token.length - 1)),
        value
      );
    } else {
      tokens.push(raw);
    }

    if (tokens.length === 0 || tokens.length > 3) {
      return [];
    } else if (tokens.length === 2) {
      if (tokens[1] !== FilterOperator.NULL) {
        tokens.unshift(null);
      }
    } else if (tokens.length === 1) {
      if (tokens[0] === FilterOperator.NULL) {
        tokens.unshift(null);
      } else {
        tokens.unshift(null, FilterOperator.EQ);
      }
    }

    return tokens;
  }

  static isOperator(value: unknown): value is FilterOperator {
    return values(FilterOperator).includes(value as any);
  }

  static OperatorSymbolToFunction() {
    return new Map<
      FilterOperator,
      (...args: any[]) => PrismaFindOperator<string>
    >([
      [
        FilterOperator.EQ,
        function Equal(value: string): PrismaEqualsOperator<string> {
          return { equals: value };
        },
      ],
      [
        FilterOperator.GT,
        function MoreThan(value: string): PrismaGtOperator<string> {
          return { gt: value };
        },
      ],
      [
        FilterOperator.GTE,
        function MoreThanOrEqual(value: string): PrismaGteOperator<string> {
          return { gte: value };
        },
      ],
      [
        FilterOperator.IN,
        function In(values: string[]): PrismaInOperator<string> {
          return { in: values };
        },
      ],
      [
        FilterOperator.NULL,
        function IsNull(_value: string): PrismaNullOperator {
          return { equals: null };
        },
      ],
      [
        FilterOperator.LT,
        function LessThan(value: string): PrismaLtOperator<string> {
          return { lt: value };
        },
      ],
      [
        FilterOperator.LTE,
        function LessThanOrEqual(value: string): PrismaLteOperator<string> {
          return { lte: value };
        },
      ],
      [
        FilterOperator.BTW,
        function Between(min: string, max: string): PrismaBtwOperator<string> {
          return { gte: min, lte: max };
        },
      ],
      [
        FilterOperator.NOT,
        function Not(value: string): PrismaNotOperator<string> {
          return { not: value };
        },
      ],
      [
        FilterOperator.ILIKE,
        function ILike(value: string): PrismaILikeOperator<string> {
          return { contains: value, mode: 'insensitive' };
        },
      ],
    ]);
  }
}

type PrismaFindOperator<T> =
  | PrismaNotOperator<T>
  | PrismaEqualsOperator<T>
  | PrismaInOperator<T>
  | PrismaLtOperator<T>
  | PrismaLteOperator<T>
  | PrismaGtOperator<T>
  | PrismaGteOperator<T>
  | PrismaBtwOperator<T>
  | PrismaILikeOperator<T>
  | PrismaNullOperator;

type PrismaNotOperator<T> = {
  not: T;
};

type PrismaEqualsOperator<T> = {
  equals: T;
};

type PrismaInOperator<T> = {
  in: T[];
};

type PrismaLtOperator<T> = {
  lt: T;
};

type PrismaLteOperator<T> = {
  lte: T;
};

type PrismaGtOperator<T> = {
  gt: T;
};

type PrismaBtwOperator<T> = {
  lte: T;
  gte: T;
};

type PrismaGteOperator<T> = {
  gte: T;
};

type PrismaNullOperator = {
  equals: null;
};

type PrismaILikeOperator<T> = {
  contains: T;
  mode: 'insensitive';
};

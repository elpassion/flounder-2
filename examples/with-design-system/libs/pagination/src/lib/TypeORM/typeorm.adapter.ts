import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import {
  FilterOperator,
  PaginateQueryWithFilter,
  PaginationFacade,
  TypeORMPaginateConfig,
} from '../pagination.interfaces';
import { Paginated, PaginateQuery } from '../pagination.interfaces';
import {
  Between,
  Brackets,
  Equal,
  FindOperator,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { values } from 'lodash';
import { Column, Order, positiveNumberOrDefault, SortBy } from '../helper';
import { WherePredicateOperator } from 'typeorm/query-builder/WhereClause';
import { PaginatedMapper } from '../paginated-mapper';

@Injectable()
export class TypeORMAdapter implements PaginationFacade {
  private DEFAULT_MAX_LIMIT = 100;
  private DEFAULT_LIMIT = 20;
  private NO_PAGINATION = 0;

  async paginate<T extends ObjectLiteral>(
    query: PaginateQuery,
    repo: Repository<T> | SelectQueryBuilder<T>,
    config: TypeORMPaginateConfig<T>
  ): Promise<Paginated<T>> {
    const page = positiveNumberOrDefault(query.page, 1, 1);

    const defaultLimit = config.defaultLimit || this.DEFAULT_LIMIT;
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

    const sortBy = [] as SortBy<T>;
    const searchBy: Column<T>[] = [];
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

    function isEntityKey(
      entityColumns: Column<T>[],
      column: string
    ): column is Column<T> {
      return !!entityColumns.find((c) => c === column);
    }

    if (config.sortableColumns.length < 1) {
      console.debug("Missing required 'sortableColumns' config.");
      throw new ServiceUnavailableException();
    }

    if (query.sortBy) {
      for (const order of query.sortBy) {
        if (
          isEntityKey(config.sortableColumns, order[0]) &&
          ['ASC', 'DESC'].includes(order[1])
        ) {
          sortBy.push(order as Order<T>);
        }
      }
    }

    if (!sortBy.length) {
      sortBy.push(
        ...(config.defaultSortBy || [[config.sortableColumns[0], 'ASC']])
      );
    }

    if (config.searchableColumns) {
      if (query.searchBy) {
        for (const column of query.searchBy) {
          if (isEntityKey(config.searchableColumns, column)) {
            searchBy.push(column);
          }
        }
      } else {
        searchBy.push(...config.searchableColumns);
      }
    }

    let [items, totalItems]: [T[], number] = [[], 0];

    const queryBuilder =
      repo instanceof Repository ? repo.createQueryBuilder('e') : repo;

    if (isPaginated) {
      queryBuilder.take(limit).skip((page - 1) * limit);
    }

    if (config.relations?.length) {
      config.relations.forEach((relation) => {
        queryBuilder.leftJoinAndSelect(
          `${queryBuilder.alias}.${relation}`,
          `${queryBuilder.alias}_${relation}`
        );
      });
    }

    let nullSort: 'NULLS LAST' | 'NULLS FIRST' | undefined = undefined;
    if (config.nullSort) {
      nullSort = config.nullSort === 'last' ? 'NULLS LAST' : 'NULLS FIRST';
    }

    for (const order of sortBy) {
      if (
        queryBuilder.expressionMap.mainAlias?.metadata.hasRelationWithPropertyPath(
          order[0].split('.')[0]
        )
      ) {
        queryBuilder.addOrderBy(
          `${queryBuilder.alias}_${order[0]}`,
          order[1],
          nullSort
        );
      } else {
        queryBuilder.addOrderBy(
          `${queryBuilder.alias}.${order[0]}`,
          order[1],
          nullSort
        );
      }
    }

    if (config.select && config.select?.length > 0) {
      const mappedSelect = config.select.map((col) => {
        if (col.includes('.')) {
          const [rel, relCol] = col.split('.');
          return `${queryBuilder.alias}_${rel}.${relCol}`;
        }

        return `${queryBuilder.alias}.${col}`;
      });
      queryBuilder.select(mappedSelect);
    }

    if (config.where) {
      queryBuilder.andWhere(
        new Brackets((qb) =>
          qb.andWhere(
            config.where as FindOptionsWhere<T> | FindOptionsWhere<T>[]
          )
        )
      );
    }

    if (config.withDeleted) {
      queryBuilder.withDeleted();
    }

    if (query.search && searchBy.length) {
      queryBuilder.andWhere(
        new Brackets((qb: any) => {
          for (const column of searchBy) {
            const propertyPath = (column as string).split('.');
            const hasRelation =
              propertyPath.length > 1 &&
              queryBuilder.expressionMap.mainAlias?.metadata.hasRelationWithPropertyPath(
                propertyPath[0]
              );

            if (
              ['postgres', 'cockroachdb'].includes(
                queryBuilder.connection.options.type
              )
            ) {
              const alias = hasRelation ? `"${qb.alias}"_` : `"${qb.alias}".`;
              let columns = '';

              for (const property of propertyPath) {
                columns += `"${property}".`;
              }
              const aliasColumn =
                alias + columns.substring(0, columns.length - 1);

              qb.orWhere(`${aliasColumn}::text ILIKE '%${query.search}%'`);
            } else {
              const aliasColumn = hasRelation
                ? `${qb.alias}_${column}`
                : `${qb.alias}.${column}`;
              qb.orWhere(
                `UPPER(${aliasColumn}) LIKE UPPER('%${query.search}%')`
              );
            }
          }
        })
      );
    }

    if (query.filter) {
      const filter = TypeORMAdapter.parseFilter(
        query as PaginateQueryWithFilter,
        config
      );
      queryBuilder.andWhere(
        new Brackets((qb: any) => {
          for (const column in filter) {
            const propertyPath = (column as string).split('.');
            if (propertyPath.length > 1) {
              let parameters = { [column]: filter[column].value };
              // TODO: refactor below
              const isRelation =
                queryBuilder.expressionMap.mainAlias?.metadata.hasRelationWithPropertyPath(
                  propertyPath[0]
                );
              const alias = isRelation
                ? `${qb.alias}_${column}`
                : `${qb.alias}.${column}`;

              const condition = qb['getWherePredicateCondition'](
                alias,
                filter[column]
              ) as WherePredicateOperator;

              switch (condition.operator) {
                case 'between':
                  condition.parameters = [
                    alias,
                    `:${column}_from`,
                    `:${column}_to`,
                  ];
                  parameters = {
                    [column + '_from']: filter[column].value[0],
                    [column + '_to']: filter[column].value[1],
                  };
                  break;
                case 'in':
                  condition.parameters = [alias, `:...${column}`];
                  break;
                default:
                  condition.parameters = [alias, `:${column}`];
                  break;
              }
              qb.andWhere(
                qb['createWhereConditionExpression'](condition),
                parameters
              );
            } else {
              qb.andWhere({
                [column]: filter[column],
              });
            }
          }
        })
      );
    }

    if (isPaginated) {
      [items, totalItems] = await queryBuilder.getManyAndCount();
    } else {
      items = await queryBuilder.getMany();
    }

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

  static isOperator(value: unknown): value is FilterOperator {
    return values(FilterOperator).includes(value as any);
  }

  static OperatorSymbolToFunction() {
    return new Map<FilterOperator, (...args: any[]) => FindOperator<string>>([
      [FilterOperator.EQ, Equal],
      [FilterOperator.GT, MoreThan],
      [FilterOperator.GTE, MoreThanOrEqual],
      [FilterOperator.IN, In],
      [FilterOperator.NULL, IsNull],
      [FilterOperator.LT, LessThan],
      [FilterOperator.LTE, LessThanOrEqual],
      [FilterOperator.BTW, Between],
      [FilterOperator.NOT, Not],
      [FilterOperator.ILIKE, ILike],
    ]);
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

  static parseFilter<T extends ObjectLiteral>(
    query: PaginateQueryWithFilter,
    config: TypeORMPaginateConfig<T>
  ) {
    const filter: { [columnName: string]: FindOperator<string> } = {};
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
        const tokens = TypeORMAdapter.getFilterTokens(raw);
        if (tokens.length === 0) {
          continue;
        }
        const [op2, op1, value] = tokens;
        console.log(tokens);

        if (
          !TypeORMAdapter.isOperator(op1) ||
          !allowedOperators.includes(op1)
        ) {
          continue;
        }
        if (TypeORMAdapter.isOperator(op2) && !allowedOperators.includes(op2)) {
          continue;
        }
        if (TypeORMAdapter.isOperator(op1)) {
          switch (op1) {
            case FilterOperator.BTW:
              filter[column] = TypeORMAdapter.OperatorSymbolToFunction().get(
                op1
              )!(...(value as string).split(','));
              break;
            case FilterOperator.IN:
              filter[column] = TypeORMAdapter.OperatorSymbolToFunction().get(
                op1
              )!(value?.split(','));
              break;
            case FilterOperator.ILIKE:
              filter[column] = TypeORMAdapter.OperatorSymbolToFunction().get(
                op1
              )!(`%${value}%`);
              break;
            default:
              filter[column] =
                TypeORMAdapter.OperatorSymbolToFunction().get(op1)!(value);
              break;
          }
        }
        if (TypeORMAdapter.isOperator(op2)) {
          filter[column] = TypeORMAdapter.OperatorSymbolToFunction().get(op2)!(
            filter[column]
          );
        }
      }
    }
    return filter;
  }
}

import {
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { ORMProvider } from './pagination.module';
import { Column, RelationColumn, SortBy } from './helper';
import { Delegate, ReturnedEntity } from './Prisma/interfaces';

export interface PaginationModuleOptions {
  provider: ORMProvider;
}

export abstract class PaginationFacade {
  abstract paginate<T extends ObjectLiteral>(
    query: PaginateQuery,
    provider: Repository<T> | SelectQueryBuilder<T>,
    config: TypeORMPaginateConfig<T>
  ): Promise<Paginated<T>>;

  abstract paginate<T extends Delegate>(
    query: PaginateQuery,
    provider: T,
    /**
     * Note: You can only sort by nulls on optional scalar fields.
     * If you try to sort by nulls on a required or relation field, Prisma Client throws a P2009 error.
     * https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#sort-with-null-records-first-or-last
     * */
    config: PrismaPaginateConfig<T>
  ): Promise<Paginated<ReturnedEntity<T>>>;
}

export interface TypeORMPaginateConfig<T extends ObjectLiteral>
  extends PaginateConfig<T> {
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  select?: Column<T>[];
  relations?: RelationColumn<T>[];
}

export interface PrismaPaginateConfig<T extends Delegate>
  extends PaginateConfig<ReturnedEntity<T>> {
  // select?: Parameters<T['findMany']>[number]['select'];
  where?: Parameters<T['findMany']>[number]['where'];
}

export interface PaginateQuery {
  page?: number;
  limit?: number;
  sortBy?: [string, string][];
  searchBy?: string[];
  search?: string;
  filter?: { [column: string]: string | string[] };
  path: string;
}

export type PaginateQueryWithFilter = Omit<PaginateQuery, 'filter'> & {
  filter: { [column: string]: string | string[] };
};

export class Paginated<T> {
  data!: T[];
  meta!: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: SortBy<T>;
    searchBy?: Column<T>[];
    search?: string;
    filter?: { [column: string]: string | string[] };
  };
  links!: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}

export interface PaginateConfig<T> {
  sortableColumns: Column<T>[];
  nullSort?: 'first' | 'last';
  searchableColumns?: Column<T>[];
  maxLimit?: number;
  defaultSortBy?: SortBy<T>;
  defaultLimit?: number;
  filterableColumns?: { [key in Column<T>]?: FilterOperator[] };
  withDeleted?: boolean;
  relativePath?: boolean;
  origin?: string;
}

export enum FilterOperator {
  EQ = '$eq',
  GT = '$gt',
  GTE = '$gte',
  IN = '$in',
  NULL = '$null',
  LT = '$lt',
  LTE = '$lte',
  BTW = '$btw',
  NOT = '$not',
  ILIKE = '$ilike',
}

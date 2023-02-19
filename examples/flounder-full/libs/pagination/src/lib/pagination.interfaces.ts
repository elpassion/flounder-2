import {
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { ORMProvider } from './pagination.module';
import { Column, RelationColumn, SortBy } from './TypeORM/helper';

export interface PaginationModuleOptions {
  provider: ORMProvider;
}

export type TypeOrmProvider<T extends ObjectLiteral> =
  | Repository<T>
  | SelectQueryBuilder<T>;
export type Provider<T extends ObjectLiteral> = TypeOrmProvider<T>;

export abstract class PaginationFacade {
  abstract paginate<T extends ObjectLiteral>(
    query: PaginateQuery,
    provider: Provider<T>,
    config: PaginateConfig<T>
  ): Promise<Paginated<T>>;
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
  relations?: RelationColumn<T>[];
  sortableColumns: Column<T>[];
  nullSort?: 'first' | 'last';
  searchableColumns?: Column<T>[];
  select?: Column<T>[];
  maxLimit?: number;
  defaultSortBy?: SortBy<T>;
  defaultLimit?: number;
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
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

import { Column, SortBy } from './helper';
import { Paginated } from './pagination.interfaces';
import { stringify } from 'querystring';
import { mapKeys } from 'lodash';

export class PaginatedMapper<T> {
  constructor(
    private readonly items: T[],
    private readonly query: {
      page: number;
      limit: number;
      path: string;
      sortBy: SortBy<T>;
      searchBy?: Column<T>[];
      search?: string;
      filter?: { [column: string]: string | string[] };
    },
    private readonly meta: {
      isPaginated: boolean;
      totalItems?: number;
    }
  ) {
    if (this.meta.isPaginated && this.meta.totalItems === undefined) {
      throw new Error('Total items is required for paginated results');
    }
  }

  toPaginated(): Paginated<T> {
    const sortByQuery = PaginatedMapper.getSortByQuery(this.query.sortBy);
    const searchQuery = PaginatedMapper.getSearchQuery(this.query.search);
    const searchByQuery = PaginatedMapper.getSearchByQuery(this.query.searchBy);
    const filterQuery = PaginatedMapper.getFilterQuery(this.query.filter);
    const options = `&limit=${this.query.limit}${sortByQuery}${searchQuery}${searchByQuery}${filterQuery}`;

    const buildLink = (p: number): string =>
      this.query.path + '?page=' + p + options;
    const totalPages = this.meta.isPaginated
      ? Math.ceil((this.meta.totalItems as number) / this.query.limit)
      : 1;

    const result: Paginated<T> = {
      data: this.items,
      meta: {
        itemsPerPage: this.meta.isPaginated
          ? this.query.limit
          : this.items.length,
        totalItems: this.meta.isPaginated
          ? (this.meta.totalItems as number)
          : this.items.length,
        currentPage: this.query.page,
        totalPages,
        sortBy: this.query.sortBy,
        search: this.query.search,
        searchBy: this.query.search ? this.query.searchBy : undefined,
        filter: this.query.filter,
      },
      links: {
        first: this.query.page == 1 ? undefined : buildLink(1),
        previous:
          this.query.page - 1 < 1 ? undefined : buildLink(this.query.page - 1),
        current: buildLink(this.query.page),
        next:
          this.query.page + 1 > totalPages
            ? undefined
            : buildLink(this.query.page + 1),
        last:
          this.query.page == totalPages || !this.meta.totalItems
            ? undefined
            : buildLink(totalPages),
      },
    };

    return Object.assign(new Paginated<T>(), result);
  }

  static getSortByQuery<T>(sortBy: SortBy<T>) {
    return sortBy.map((order) => `&sortBy=${order.join(':')}`).join('');
  }

  static getSearchQuery(search?: string) {
    return search ? `&search=${search}` : '';
  }

  static getSearchByQuery<T>(searchBy?: Column<T>[]) {
    return searchBy && searchBy.length > 0
      ? searchBy.map((column) => `&searchBy=${column}`).join('')
      : '';
  }

  static getFilterQuery(filter?: { [column: string]: string | string[] }) {
    return filter
      ? '&' +
          stringify(
            mapKeys(filter, (_param, name) => 'filter.' + name),
            '&',
            '=',
            { encodeURIComponent: (str) => str }
          )
      : '';
  }
}

export abstract class Paginated<T> {
  data: T[] = [];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy?: SortBy<T>;
    searchBy?: Column<T>[];
    search?: string;
    filter?: {
      [column: string]: string | string[];
    };
  } = {
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
    totalItems: 10,
  };
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  } = { current: '' };

  static generate<T>(this: new () => Paginated<T>, recordGenerator: (index: number) => T) {
    const paginated = new this();
    paginated.data = Array.from({ length: 10 }, (_, index) => {
      return recordGenerator(index);
    });
    return paginated;
  }
}

export type Column<T> = Extract<keyof T, string>;
export type Order<T> = [Column<T>, 'ASC' | 'DESC'];
export type SortBy<T> = Order<T>[];

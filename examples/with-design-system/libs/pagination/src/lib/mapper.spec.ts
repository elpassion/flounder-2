import { PaginatedMapper } from './paginated-mapper';

describe('PaginationMapper', () => {
  it('should throw error when isPaginated is true and no totalItems provided', () => {
    expect(
      () =>
        new PaginatedMapper(
          [{ id: 1, name: 'test' }],
          {
            page: 1,
            limit: 10,
            path: '/test',
            sortBy: [['id', 'ASC']],
          },
          {
            isPaginated: true,
          }
        )
    ).toThrowError('Total items is required for paginated results');
  });

  it('should return the correct pagination object', () => {
    const result = new PaginatedMapper(
      [
        { id: 1, name: 'test' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
      ],
      {
        page: 1,
        limit: 1,
        path: '/test',
        sortBy: [['id', 'ASC']],
        search: 'es',
        searchBy: ['name'],
        filter: {
          name: '$not:john',
        },
      },
      {
        isPaginated: true,
        totalItems: 3,
      }
    ).toPaginated();

    expect(result).toEqual({
      data: [
        { id: 1, name: 'test' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
      ],
      meta: {
        itemsPerPage: 1,
        totalItems: 3,
        currentPage: 1,
        totalPages: 3,
        sortBy: [['id', 'ASC']],
        search: 'es',
        searchBy: ['name'],
        filter: {
          name: '$not:john',
        },
      },
      links: {
        first: undefined,
        previous: undefined,
        current:
          '/test?page=1&limit=1&sortBy=id:ASC&search=es&searchBy=name&filter.name=$not:john',
        next: '/test?page=2&limit=1&sortBy=id:ASC&search=es&searchBy=name&filter.name=$not:john',
        last: '/test?page=3&limit=1&sortBy=id:ASC&search=es&searchBy=name&filter.name=$not:john',
      },
    });
  });

  it('should correct links if more pages exist', () => {
    const result = new PaginatedMapper(
      [
        { id: 1, name: 'test' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
      ],
      {
        page: 2,
        limit: 1,
        path: '/test',
        sortBy: [['id', 'ASC']],
      },
      {
        isPaginated: true,
        totalItems: 3,
      }
    ).toPaginated();

    expect(result).toEqual({
      data: [
        { id: 1, name: 'test' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
      ],
      meta: {
        itemsPerPage: 1,
        totalItems: 3,
        currentPage: 2,
        totalPages: 3,
        sortBy: [['id', 'ASC']],
        search: undefined,
        searchBy: undefined,
        filter: undefined,
      },
      links: {
        first: '/test?page=1&limit=1&sortBy=id:ASC',
        previous: '/test?page=1&limit=1&sortBy=id:ASC',
        current: '/test?page=2&limit=1&sortBy=id:ASC',
        next: '/test?page=3&limit=1&sortBy=id:ASC',
        last: '/test?page=3&limit=1&sortBy=id:ASC',
      },
    });
  });
});

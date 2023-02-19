import {
  CrudFilter,
  CrudFilters,
  CrudOperators,
  CrudSorting,
  LogicalFilter,
  MetaDataQuery,
  Pagination,
} from '@pankod/refine-core';
import restDataProvider from '@pankod/refine-simple-rest';
import queryString from 'query-string';
import { Paginated } from '@flounder/contracts';
import { HttpClient } from '@flounder/http-client';

export const adminDataProvider = (httpClient: HttpClient): typeof defaultDataProvider => {
  const defaultDataProvider = restDataProvider('');

  return {
    ...defaultDataProvider,
    getOne: async <T>({ resource, id }) => {
      const response = await httpClient.get<T>(`/api/${resource}/${id}`);
      return {
        data: response,
      };
    },
    update: async <T>({ resource, id, variables }) => {
      const response = await httpClient.patch<any, T>(`/api/${resource}/${id}`, variables);
      return {
        data: response,
      };
    },
    getList: async <T>({
      resource,
      pagination,
      filters,
      sort,
    }: {
      resource: string;
      pagination?: Pagination;
      filters?: CrudFilters;
      sort?: CrudSorting;
    }) => {
      const response = await httpClient.get<Paginated<T> | T[]>(`/api/${resource}`, {
        params: {
          ...generatePagination(pagination),
          ...generateFilter(filters),
          ...generateSort(sort),
        },
      });

      if (isListResponsePaginated(response)) {
        return {
          data: response.data,
          total: response.meta.totalItems,
        };
      }
      return {
        data: response,
        total: response.length,
      };
    },
    custom: async <ReturnType, TQuery extends Record<string, any>, TPayload>({
      url,
      method,
      payload,
      query,
    }: {
      url: string;
      method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';
      sort?: CrudSorting;
      filters?: CrudFilter[];
      payload?: TPayload;
      headers?: Record<string, unknown>;
      metaData?: MetaDataQuery;
      query?: TQuery;
    }) => {
      let requestUrl = `${url}?`;

      if (query) {
        requestUrl = `${requestUrl}&${queryString.stringify(query)}`;
      }
      switch (method) {
        case 'put':
        case 'post':
        case 'patch':
        case 'delete':
          return {
            data: await httpClient[method]<TPayload, ReturnType>(requestUrl, payload as TPayload),
          };
        case 'get':
        default:
          return {
            data: await httpClient.get<ReturnType>(requestUrl),
          };
      }
    },
  };
};

function isListResponsePaginated<T>(response: Paginated<T> | T[]): response is Paginated<T> {
  return (response as Paginated<T>).meta !== undefined;
}

function mapOperator(operator: CrudOperators) {
  switch (operator) {
    case 'between':
      return '$btw:';
    case 'ne':
      return '$not:';
    case 'gte':
    case 'gt':
    case 'null':
    case 'in':
    case 'lte':
      return `$${operator}:`;
    default:
      return ''; // default "eq"
  }
}

function mapSortOrder(order: 'asc' | 'desc' | null) {
  switch (order) {
    case 'asc':
      return 'ASC';
    case 'desc':
      return 'DESC';
    default:
      return null;
  }
}

const generateSort = (sort?: CrudSorting) => {
  const sortBy: { [key: string]: string } = {};

  if (sort) {
    sort.forEach(item => {
      sortBy['sortBy'] = `${item.field}:${mapSortOrder(item.order)}`;
    });
  }

  return sortBy;
};
const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};
  if (filters) {
    filters.forEach(({ field, operator, value }: LogicalFilter) => {
      const mappedOperator = mapOperator(operator);
      queryFilters[`${mappedOperator && 'filter.'}${field}`] = `${mappedOperator}${value}`;
    });
  }

  return queryFilters;
};
const generatePagination = (pagination?: Pagination) => {
  const queryPagination: { [key: string]: number | string } = {};
  if (pagination) {
    queryPagination.page = pagination.current;
    queryPagination.limit = pagination.pageSize;
  }

  return queryPagination;
};

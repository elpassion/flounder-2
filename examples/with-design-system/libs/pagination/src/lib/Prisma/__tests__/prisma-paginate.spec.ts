import { Cat, Home, PrismaClient, Toy } from './.prisma/pagination-client';
import { PrismaAdapter } from '../prisma.adapter';
import {
  FilterOperator,
  Paginated,
  PaginateQuery,
} from '../../pagination.interfaces';
import { HttpException } from '@nestjs/common';

describe('Prisma paginate', () => {
  let prisma: PrismaClient;
  let cats: Cat[];
  let catToys: Toy[];
  let catHomes: Home[];
  const adapter = new PrismaAdapter();
  const NO_PAGINATION = 0;

  beforeAll(async () => {
    prisma = new PrismaClient();

    await prisma.toy.deleteMany({});
    await prisma.home.deleteMany({});
    await prisma.cat.deleteMany({});
    await prisma.cat.create({
      data: {
        name: 'Milo',
        color: 'brown',
        age: 6,
        height: 25,
        width: 10,
        length: 40,
      },
    });
    await prisma.cat.create({
      data: {
        name: 'Garfield',
        color: 'ginger',
        age: 5,
        height: 30,
        width: 15,
        length: 45,
      },
    });
    await prisma.cat.create({
      data: {
        name: 'Shadow',
        color: 'black',
        age: 4,
        height: 25,
        width: 10,
        length: 50,
      },
    });
    await prisma.cat.create({
      data: {
        name: 'George',
        color: 'white',
        age: 3,
        height: 35,
        width: 12,
        length: 40,
      },
    });
    await prisma.cat.create({
      data: {
        name: 'Leche',
        color: 'white',
        age: null,
        height: 10,
        width: 5,
        length: 15,
      },
    });
    cats = await prisma.cat.findMany();

    await prisma.toy.create({
      data: {
        name: 'Fuzzy Thing',
        catId: cats[0].id,
        height: 10,
        width: 10,
        length: 10,
      },
    });
    await prisma.toy.create({
      data: {
        name: 'Stuffed Mouse',
        catId: cats[0].id,
        height: 5,
        width: 5,
        length: 12,
      },
    });
    await prisma.toy.create({
      data: {
        name: 'Mouse',
        catId: cats[0].id,
        height: 6,
        width: 4,
        length: 13,
      },
    });
    await prisma.toy.create({
      data: {
        name: 'String',
        catId: cats[1].id,
        height: 1,
        width: 1,
        length: 50,
      },
    });

    catToys = await prisma.toy.findMany();

    await prisma.home.create({
      data: { name: 'Box', catId: cats[0].id },
    });
    await prisma.home.create({
      data: { name: 'House', catId: cats[1].id },
    });

    catHomes = await prisma.home.findMany();
  });

  afterAll(async () => {
    await prisma.toy.deleteMany({});
    await prisma.home.deleteMany({});
    await prisma.cat.deleteMany({});
  });

  // @@@@@@ TESTS @@@@@@

  it('should return an instance of Paginated', async () => {
    const query: PaginateQuery = {
      path: '',
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      defaultSortBy: [['id', 'ASC']],
      defaultLimit: 1,
    });

    expect(result).toBeInstanceOf(Paginated);
    expect(result.data).toStrictEqual(cats.slice(0, 1));
  });

  it('should accept a delegate', async () => {
    const query: PaginateQuery = {
      path: '',
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      defaultSortBy: [['id', 'ASC']],
      defaultLimit: 1,
    });

    expect(result.data).toStrictEqual(cats.slice(0, 1));
  });

  it('should default to page 1, if negative page is given', async () => {
    const query: PaginateQuery = {
      path: '',
      page: -1,
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      defaultLimit: 1,
    });

    expect(result.meta.currentPage).toBe(1);
    expect(result.data).toStrictEqual(cats.slice(0, 1));
  });

  it('should default to limit maxLimit, if maxLimit is not 0', async () => {
    const query: PaginateQuery = {
      path: '',
      limit: NO_PAGINATION,
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      maxLimit: 1,
      defaultLimit: 1,
    });
    expect(result.data).toStrictEqual(cats.slice(0, 1));
  });

  it('should return all cats', async () => {
    const query: PaginateQuery = {
      path: '',
      limit: NO_PAGINATION,
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      maxLimit: NO_PAGINATION,
      defaultLimit: 1,
    });

    expect(result.data).toStrictEqual(cats);
  });

  it('should limit to defaultLimit, if limit is negative', async () => {
    const query: PaginateQuery = {
      path: '',
      limit: -1,
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      maxLimit: NO_PAGINATION,
      defaultLimit: 1,
    });

    expect(result.data).toStrictEqual(cats.slice(0, 1));
  });

  it('should default to limit defaultLimit, if maxLimit is 0', async () => {
    const query: PaginateQuery = {
      path: '',
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      maxLimit: NO_PAGINATION,
      defaultLimit: 1,
    });

    expect(result.data).toStrictEqual(cats.slice(0, 1));
  });

  it('should default to limit maxLimit, if more than maxLimit is given', async () => {
    const query: PaginateQuery = {
      path: '',
      page: 1,
      limit: 20,
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      defaultLimit: 5,
      maxLimit: 2,
    });

    expect(result.data).toStrictEqual(cats.slice(0, 2));
  });

  it('should return correct links for some results', async () => {
    const query: PaginateQuery = {
      path: '',
      page: 2,
      limit: 2,
    };

    const { links } = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
    });

    expect(links.first).toBe('?page=1&limit=2&sortBy=id:ASC');
    expect(links.previous).toBe('?page=1&limit=2&sortBy=id:ASC');
    expect(links.current).toBe('?page=2&limit=2&sortBy=id:ASC');
    expect(links.next).toBe('?page=3&limit=2&sortBy=id:ASC');
    expect(links.last).toBe('?page=3&limit=2&sortBy=id:ASC');
  });

  it('should return a relative path', async () => {
    const query: PaginateQuery = {
      path: 'http://localhost/cats',
      page: 2,
      limit: 2,
    };

    const { links } = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      relativePath: true,
    });

    expect(links.first).toBe('/cats?page=1&limit=2&sortBy=id:ASC');
    expect(links.previous).toBe('/cats?page=1&limit=2&sortBy=id:ASC');
    expect(links.current).toBe('/cats?page=2&limit=2&sortBy=id:ASC');
    expect(links.next).toBe('/cats?page=3&limit=2&sortBy=id:ASC');
    expect(links.last).toBe('/cats?page=3&limit=2&sortBy=id:ASC');
  });

  it('should return an absolute path', async () => {
    const query: PaginateQuery = {
      path: 'http://localhost/cats',
      page: 2,
      limit: 2,
    };

    const { links } = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      relativePath: false,
    });

    expect(links.first).toBe(
      'http://localhost/cats?page=1&limit=2&sortBy=id:ASC'
    );
    expect(links.previous).toBe(
      'http://localhost/cats?page=1&limit=2&sortBy=id:ASC'
    );
    expect(links.current).toBe(
      'http://localhost/cats?page=2&limit=2&sortBy=id:ASC'
    );
    expect(links.next).toBe(
      'http://localhost/cats?page=3&limit=2&sortBy=id:ASC'
    );
    expect(links.last).toBe(
      'http://localhost/cats?page=3&limit=2&sortBy=id:ASC'
    );
  });

  it('should return an absolute path with new origin', async () => {
    const query: PaginateQuery = {
      path: 'http://localhost/cats',
      page: 2,
      limit: 2,
    };

    const { links } = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      relativePath: false,
      origin: 'http://cats.example',
    });

    expect(links.first).toBe(
      'http://cats.example/cats?page=1&limit=2&sortBy=id:ASC'
    );
    expect(links.previous).toBe(
      'http://cats.example/cats?page=1&limit=2&sortBy=id:ASC'
    );
    expect(links.current).toBe(
      'http://cats.example/cats?page=2&limit=2&sortBy=id:ASC'
    );
    expect(links.next).toBe(
      'http://cats.example/cats?page=3&limit=2&sortBy=id:ASC'
    );
    expect(links.last).toBe(
      'http://cats.example/cats?page=3&limit=2&sortBy=id:ASC'
    );
  });

  it('should return only current link if zero results', async () => {
    const query: PaginateQuery = {
      path: '',
      page: 1,
      limit: 2,
      search: 'Pluto',
    };

    const { links } = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      searchableColumns: ['name'],
    });

    expect(links.first).toBe(undefined);
    expect(links.previous).toBe(undefined);
    expect(links.current).toBe('?page=1&limit=2&sortBy=id:ASC&search=Pluto');
    expect(links.next).toBe(undefined);
    expect(links.last).toBe(undefined);
  });

  it('should default to defaultSortBy if query sortBy does not exist', async () => {
    const query: PaginateQuery = {
      path: '',
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'createdAt'],
      defaultSortBy: [['id', 'DESC']],
    });

    expect(result.meta.sortBy).toStrictEqual([['id', 'DESC']]);
    expect(result.data).toStrictEqual(cats.slice(0).reverse());
  });

  it('should put null values last when sorting', async () => {
    const query: PaginateQuery = {
      path: '',
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['age', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['age', 'ASC']],
    });
    const expectedResult = [...cats.slice(0, -1).reverse(), cats.slice(-1)[0]];

    expect(result.meta.sortBy).toStrictEqual([['age', 'ASC']]);
    expect(result.data).toStrictEqual(expectedResult);
  });

  it('should put null values first when sorting', async () => {
    const query: PaginateQuery = {
      path: '',
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['age', 'createdAt'],
      nullSort: 'first',
      defaultSortBy: [['age', 'ASC']],
    });

    const expectedResult = [
      cats[cats.length - 1],
      ...cats.slice(0, cats.length - 1).reverse(),
    ];

    expect(result.meta.sortBy).toStrictEqual([['age', 'ASC']]);
    expect(result.data).toStrictEqual(expectedResult);
  });

  it('should put null values first when nullSort is not specified', async () => {
    const query: PaginateQuery = {
      path: '',
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['age', 'createdAt'],
      defaultSortBy: [['age', 'ASC']],
    });

    const expectedCats = cats.slice();

    expect(result.meta.sortBy).toStrictEqual([['age', 'ASC']]);
    expect(result.data).toStrictEqual(expectedCats.reverse());
  });

  it('should sort result by multiple columns', async () => {
    const query: PaginateQuery = {
      path: '',
      sortBy: [
        ['color', 'DESC'],
        ['name', 'ASC'],
      ],
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['name', 'color'],
    });

    expect(result.meta.sortBy).toStrictEqual([
      ['color', 'DESC'],
      ['name', 'ASC'],
    ]);
    expect(result.data).toStrictEqual([
      cats[3],
      cats[4],
      cats[1],
      cats[0],
      cats[2],
    ]);
  });

  it('should return result based on search term', async () => {
    const query: PaginateQuery = {
      path: '',
      search: 'i',
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'name', 'color'],
      searchableColumns: ['name', 'color'],
    });

    expect(result.meta.search).toStrictEqual('i');
    expect(result.data).toStrictEqual([cats[0], cats[1], cats[3], cats[4]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&search=i'
    );
  });

  it('should return result based on search term and searchBy columns', async () => {
    const searchTerm = 'white';
    const expectedResultData = cats.filter(
      (cat: Cat) => cat.color === searchTerm
    );

    const query: PaginateQuery = {
      path: '',
      search: searchTerm,
      searchBy: ['color'],
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'name', 'color'],
      searchableColumns: ['name', 'color'],
    });

    expect(result.meta.search).toStrictEqual(searchTerm);
    expect(result.meta.searchBy).toStrictEqual(['color']);
    expect(result.data).toStrictEqual(expectedResultData);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&search=white&searchBy=color'
    );
  });

  it('should return result based on where config and filter', async () => {
    const query: PaginateQuery = {
      path: '',
      filter: {
        name: '$not:Leche',
      },
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      where: {
        color: 'white',
      },
      filterableColumns: {
        name: [FilterOperator.NOT],
      },
    });

    expect(result.meta.filter).toStrictEqual({
      name: '$not:Leche',
    });
    expect(result.data).toStrictEqual([cats[3]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&filter.name=$not:Leche'
    );
  });

  it('should return result based on $in filter', async () => {
    const query: PaginateQuery = {
      path: '',
      filter: {
        age: '$in:4,6',
      },
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'name'],
      filterableColumns: {
        age: [FilterOperator.IN],
      },
    });

    expect(result.meta.filter).toStrictEqual({
      age: '$in:4,6',
    });
    expect(result.data).toStrictEqual([cats[0], cats[2]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&filter.age=$in:4,6'
    );
  });

  it('should return result based on $lt filter', async () => {
    const query: PaginateQuery = {
      path: '',
      filter: {
        age: '$lt:4',
      },
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'name'],
      filterableColumns: {
        age: [FilterOperator.LT],
      },
    });

    expect(result.meta.filter).toStrictEqual({
      age: '$lt:4',
    });
    expect(result.data).toStrictEqual([cats[3]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&filter.age=$lt:4'
    );
  });

  it('should return result based on $lte filter', async () => {
    const query: PaginateQuery = {
      path: '',
      filter: {
        age: '$lte:4',
      },
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'name'],
      filterableColumns: {
        age: [FilterOperator.LTE],
      },
    });

    expect(result.meta.filter).toStrictEqual({
      age: '$lte:4',
    });
    expect(result.data).toStrictEqual([cats[2], cats[3]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&filter.age=$lte:4'
    );
  });

  it('should return result based on $gt filter', async () => {
    const query: PaginateQuery = {
      path: '',
      filter: {
        age: '$gt:4',
      },
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'name'],
      filterableColumns: {
        age: [FilterOperator.GT],
      },
    });

    expect(result.meta.filter).toStrictEqual({
      age: '$gt:4',
    });
    expect(result.data).toStrictEqual([cats[0], cats[1]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&filter.age=$gt:4'
    );
  });

  it('should return result based on $gte filter', async () => {
    const query: PaginateQuery = {
      path: '',
      filter: {
        age: '$gte:4',
      },
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'name'],
      filterableColumns: {
        age: [FilterOperator.GTE],
      },
    });

    expect(result.meta.filter).toStrictEqual({
      age: '$gte:4',
    });
    expect(result.data).toStrictEqual([cats[0], cats[1], cats[2]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&filter.age=$gte:4'
    );
  });

  it('should return result based on $btw filter', async () => {
    const query: PaginateQuery = {
      path: '',
      filter: {
        age: '$btw:4,6',
      },
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'name'],
      filterableColumns: {
        age: [FilterOperator.BTW],
      },
    });

    expect(result.meta.filter).toStrictEqual({
      age: '$btw:4,6',
    });
    expect(result.data).toStrictEqual([cats[0], cats[1], cats[2]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&filter.age=$btw:4,6'
    );
  });

  it('should return result based on $null filter', async () => {
    const query: PaginateQuery = {
      path: '',
      filter: {
        age: '$null',
      },
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'name'],
      filterableColumns: {
        age: [FilterOperator.NULL],
      },
    });

    expect(result.meta.filter).toStrictEqual({
      age: '$null',
    });
    expect(result.data).toStrictEqual([cats[4]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&filter.age=$null'
    );
  });

  it('should return result based on $not$null filter', async () => {
    const query: PaginateQuery = {
      path: '',
      filter: {
        age: '$not:$null',
      },
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id', 'name'],
      filterableColumns: {
        age: [FilterOperator.NOT, FilterOperator.NULL],
      },
    });

    expect(result.meta.filter).toStrictEqual({
      age: '$not:$null',
    });
    expect(result.data).toStrictEqual([cats[0], cats[1], cats[2], cats[3]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&filter.age=$not:$null'
    );
  });

  it('should throw an error when no sortableColumns', async () => {
    const query: PaginateQuery = {
      path: '',
    };

    try {
      await adapter.paginate(query, prisma.cat, {
        sortableColumns: [],
      });
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
    }
  });

  it.each([
    { operator: '$eq', result: true },
    { operator: '$gte', result: true },
    { operator: '$gt', result: true },
    { operator: '$in', result: true },
    { operator: '$null', result: true },
    { operator: '$lt', result: true },
    { operator: '$lte', result: true },
    { operator: '$btw', result: true },
    { operator: '$not', result: true },
    { operator: '$ilike', result: true },
    { operator: '$fake', result: false },
  ])(
    'should check operator "$operator" valid is $result',
    ({ operator, result }) => {
      expect(PrismaAdapter.isOperator(operator)).toStrictEqual(result);
    }
  );

  it.each([
    { operator: '$eq', name: 'Equal' },
    { operator: '$gt', name: 'MoreThan' },
    { operator: '$gte', name: 'MoreThanOrEqual' },
    { operator: '$in', name: 'In' },
    { operator: '$null', name: 'IsNull' },
    { operator: '$lt', name: 'LessThan' },
    { operator: '$lte', name: 'LessThanOrEqual' },
    { operator: '$btw', name: 'Between' },
    { operator: '$not', name: 'Not' },
    { operator: '$ilike', name: 'ILike' },
  ])(
    'should get operator function $name for "$operator"',
    ({ operator, name }) => {
      const func = PrismaAdapter.OperatorSymbolToFunction().get(
        operator as FilterOperator
      );
      expect(func.name).toStrictEqual(name);
    }
  );

  it.each([
    { string: '$ilike:value', tokens: [null, '$ilike', 'value'] },
    { string: '$eq:value', tokens: [null, '$eq', 'value'] },
    { string: '$eq:val:ue', tokens: [null, '$eq', 'val:ue'] },
    {
      string: '$in:value1,value2,value3',
      tokens: [null, '$in', 'value1,value2,value3'],
    },
    {
      string: '$not:$in:value1:a,value2:b,value3:c',
      tokens: ['$not', '$in', 'value1:a,value2:b,value3:c'],
    },
    { string: 'value', tokens: [null, '$eq', 'value'] },
    { string: 'val:ue', tokens: [null, '$eq', 'val:ue'] },
    { string: '$not:value', tokens: [null, '$not', 'value'] },
    { string: '$eq:$not:value', tokens: ['$eq', '$not', 'value'] },
    { string: '$eq:$null', tokens: ['$eq', '$null'] },
    { string: '$null', tokens: [null, '$null'] },
    { string: '', tokens: [null, '$eq', ''] },
    { string: '$eq:$not:$in:value', tokens: [] },
  ])('should get filter tokens for "$string"', ({ string, tokens }) => {
    expect(PrismaAdapter.getFilterTokens(string)).toStrictEqual(tokens);
  });

  it('should return result based on multiple filter', async () => {
    const query: PaginateQuery = {
      path: '',
      filter: {
        name: '$not:Leche',
        color: 'white',
      },
    };

    const result = await adapter.paginate(query, prisma.cat, {
      sortableColumns: ['id'],
      filterableColumns: {
        name: [FilterOperator.NOT],
        color: [FilterOperator.EQ],
      },
    });

    expect(result.meta.filter).toStrictEqual({
      name: '$not:Leche',
      color: 'white',
    });
    expect(result.data).toStrictEqual([cats[3]]);
    expect(result.links.current).toBe(
      '?page=1&limit=20&sortBy=id:ASC&filter.name=$not:Leche&filter.color=white'
    );
  });
});

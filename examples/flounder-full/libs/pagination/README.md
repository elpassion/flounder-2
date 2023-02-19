# Pagination
[comment]: <> (Required section: Description & Functionalities)
## Description
A module used to handle pagination, currently supporting TypeORM.

Available via `@flounder/pagination`

## Functionalities
### Allows using various ORMs
- Pagination abstraction that allows multiple ORM implementations.
- Implementation is ready for `TypeORM`. Other ORMs need implementation from scratch inside this lib.

### Allows defining filters etc. on frontend side
- `PaginateQuery` interface allows providing filtering, sorting, searching and pagination options on frontend side.
- `PaginateConfig` interface let you specify which features are available on frontend side (f.e. what columns can you search by)
- `Paginated` interface describes shape of a response body of paginated requests

#### Example of use
Import `PaginationModule` from `@flounder/pagination` inside your root module and configure it.
>  `forRootAsync` method is supported only with factory function provided


```typescript
import { PaginationModule, ORMProvider } from '@flounder/pagination';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PaginationModule.register({
      provider: ORMProvider.TYPEORM,
    }),
  ],
})
export class AppModule {}
```

Afterwards, the pagination facade will be available to access across the entire application, ex.

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppFacade {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly pagination: PaginationFacade
  ) {}

  getMany(query: PaginateQuery): Promise<Paginated<ExtendedUserDto>> {
      return this.pagination.paginate(query, this.usersRepository, {
          sortableColumns: ['cognito_id', 'email', 'first_name', 'last_name', 'description'],
          searchableColumns: ['email', 'first_name', 'last_name'],
          defaultSortBy: [['cognito_id', 'DESC']],
      });
  }
}
```

### Available methods

```typescript
paginate: <T extends ObjectLiteral>(query: PaginateQuery, provider: Provider<T>, config: PaginateConfig<T>) => Promise<Paginated<T>>;
```

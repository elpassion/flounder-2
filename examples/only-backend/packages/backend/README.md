## Installation

```bash
$ yarn install
```

## Configuration setup

There is default .env.development file. If you want to use custom config create .env.development.local using
.env.development shape.

## Database / Migrations

- To set up database 'DATABASE_URL' env variable is needed.
- Make sure env.development.local file is created
- According to "code first" approach (change database model first), in order to generate a migration:
  ```bash
    pnpm typeorm:migrations generate --name=<migration-name>
  ```
- To apply/revert/list migrations use accordingly:
  ```bash
    pnpm typeorm:migrations run
    pnpm typeorm:migrations revert
    pnpm typeorm:migrations list
  ```

If you wish to use migrations commands on test env, make sure to create .env.test file with proper DATABASE_URL and use:
```bash
  pnpm typeorm:migrations:test
```

_Note: migrations are applied automatically when application is starting_

## Queues

App has implemented queues system using Bull and Redis. There is
also [Bull board](https://github.com/felixmosh/bull-board#readme) available here:

  ```bash
    http://localhost:{API_PORT}/bull-board
  ```

Bull board access is protected with user and password specified in .env as:

  ```bash
    BULL_BOARD_USER
    BULL_BOARD_PASSWORD
  ```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

The application provides healthcheck endpoint. It's accessible
via: [http://localhost:{API_PORT}/api/health](http://localhost:{API_PORT}/api/health)

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## OpenAPI (swagger)

The api documentation is available via: [http://localhost:{API_PORT}/api](http://localhost:{API_PORT}/api)

> This is a [Nest.js](https://nestjs.com/) project - app `backend`.

## Installation

Backend packages are installed during installation in root directory by

```bash
$ pnpm install
```

## Configuration setup

Backend envs are configured using general env decryption described in [Main README - Required setup after generating new project section](../../README.md#required-setup-after-generating-new-project-from-flounder).

`AWS Cognito` related envs come from `xxx-stg-public-user-pool-client-without-secret` cognito app.

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

To run only backend app:

```bash
# tip: run awsume first
$ pnpm nx run backend:serve
```

The application provides healthcheck endpoint. It's accessible
via: [http://localhost:{API_PORT}/api/health](http://localhost:{API_PORT}/api/health)

## Test

```bash
# unit tests (all)
$ pnpm nx run backend:test

# e2e tests (all)
$ pnpm nx run backend:test:e2e
```

Place new tests in `__tests__` directory.

## OpenAPI (swagger)

The api documentation is available via: [http://localhost:3001/swagger](http://localhost:3001/swagger).

## Project dependencies

[comment]: <> (TODO: add link to ready libs README)
[comment]: <> (TODO: add nx-graph image)
Backend app use project libs: `contracts`, `mailer`, `storage`, `websocket`.

For detailed graph of dependencies run `pnpm nx graph`.

## Project details

**Database:** [PostgreSQL](https://www.postgresql.org/), [Redis](https://redis.io/) (cache), `Bull` (queue)

**Translation:** [nestjs-i18n](https://nestjs-i18n.com/) library

## Project modules

Most of the modules are inside `src/modules` directory.

- **Auth**
  - Includes necessary guards, interfaces, adapters etc., used in other modules, e.g. `User module` (`src/auth`).
  - Handles authorization & permissions.
- **Users**
  - Basic account module with CRUD operations (`src/domain/users`).
- **App Config**
  - Environment variables validation, base env for application.
- **Commands**
  - Creates command-line commands (example of use: migration commands).
  - You can use modules & JS scripts inside commands (used external package: `nestjs-console`).
- **Database**
  - Configures connection to the database.
- **Email Sending Processor, Mail Dispatcher, Send Email**
  - Modules related to sending emails from the app.
- **Email Subscriptions**
  - Handle storing info about subscriptions in the database and send a confirmation email to the user.
  - Imports necessary modules like Mailer module, Queue module, WebSocket Module, Events Module and Auth module.
  - Emails templates are inside `src/templates` directory.
- **Events**
  - Saves events (e.g. about sending subscription) to the database and exposes endpoint with events list.
- **Feature flags**
  - Lets you list and set feature flags.
  - Feature flags are not stored in database (only in app memory).
  - The module still needs to be fully implemented.
- **Files temporary**
  - Handles uploading files to temporary AWS S3 bucket.
- **Health**
  - Provides liveness health checks.
  - Depending on the HTTP status code returned from a GET request to health check address, the service will take action when it receives an _unhealthy_ response.
- **Notifications Processor**
  - Consumes queue and sends the notifications via websockets.
  - Uses project lib `@flounder/websocket`.
- **Queue**
  - Used mainly in `bull-board`, it queues email subscriptions & notifications
  - Data is stored in `redis`.
- **Registration**
  - Simple module that uses `Auth Module` and `User Module` to register a new user (`src/modules/registration`).
- **Translation**
  - Handles app translation with the use of `nestjs-i18n` library.
  - Translations are stored in `i18n` directory.

## Manually triggered deploy count

🐟


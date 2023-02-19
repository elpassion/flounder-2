import { Provider, Scope } from '@nestjs/common';
import { Connection, MigrationExecutor } from 'typeorm';

export const MIGRATION_EXECUTOR_TOKEN = Symbol('MIGRATION_EXECUTOR');

export const migrationExecutorProvider: Provider = {
  provide: MIGRATION_EXECUTOR_TOKEN,
  inject: [Connection],
  scope: Scope.DEFAULT, //singleton here because /api/ping is called multiple times
  useFactory: (connection: Connection) => {
    return new MigrationExecutor(connection, connection.createQueryRunner());
  },
};

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const typeOrmMigrationsConnectionOptionsFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const databaseUrl = configService.get('DATABASE_URL');
  const logging = configService.get('DATABASE_LOGGING') === 'true';

  return getConfig(databaseUrl, logging);
};

const getConfig = (
  url: string,
  logging: boolean
): PostgresConnectionOptions => ({
  name: 'default', //for all environments
  type: 'postgres',
  url,
  schema: 'public',
  synchronize: false,
  migrationsRun: false,
  logging,
  entities: ['apps/backend/src/**/*.entity.ts'],
  migrations: ['apps/backend/src/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

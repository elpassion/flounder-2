import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NodeEnvironment } from '../../shared/common/configuration/node-environment';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import path from 'path';

export const typeOrmConnectionOptionsFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const databaseUrl = configService.get('DATABASE_URL') as string;
  const logging = configService.get('DATABASE_LOGGING') === 'true';
  const nodeEnv = configService.get('NODE_ENV') as NodeEnvironment;
  const migrations =
    nodeEnv === NodeEnvironment.Test
      ? ['apps/backend/**/migrations/*.ts']
      : [path.join(__dirname, 'migrations', '*.js')];

  return getConfig(databaseUrl, logging, migrations);
};

const getConfig = (
  url: string,
  logging: boolean,
  migrations: string[],
): PostgresConnectionOptions => ({
  name: 'default', //for all environments
  type: 'postgres',
  url,
  schema: 'public',

  synchronize: false,
  migrationsRun: true,

  logging,

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  autoLoadEntities: true,

  migrations,
  migrationsTableName: 'migrations',

  cli: {
    migrationsDir: './apps/backend/src/migrations',
  },
});

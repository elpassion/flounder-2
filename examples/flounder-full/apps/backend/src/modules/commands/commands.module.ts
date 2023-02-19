import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConsoleModule } from 'nestjs-console';
import { MigrationCommand } from './migration.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmMigrationsConnectionOptionsFactory } from './typeorm-migrations-connection-options.factory';

@Module({
  imports: [
    ConsoleModule,
    ConfigModule.forRoot({
      envFilePath: [
        `apps/backend/.env.${process.env.NODE_ENV || 'development'}.local`,
        'apps/backend/.env',
        `apps/backend/.env.${process.env.NODE_ENV || 'development'}`,
      ],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmMigrationsConnectionOptionsFactory,
    }),
  ],
  controllers: [],
  providers: [MigrationCommand],
  exports: [],
})
export class CommandsModule {}

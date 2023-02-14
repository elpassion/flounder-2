import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { randomUUID } from 'crypto';
import { LoggerModule } from 'nestjs-pino';
import { AppConfigModule, BaseConfig } from '../modules/app-config';
import { HealthModule } from '../modules/health/health.module';
import { AppController } from './app.controller';
import { SyncModule } from '../modules/sync/sync.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    // Global Modules
    ConfigModule.forRoot({
      envFilePath: [
        `packages/backend/.env.${process.env.NODE_ENV || 'development'}.local`,
        'packages/backend/.env',
        `packages/backend/.env.${process.env.NODE_ENV || 'development'}`,
      ],
      cache: true,
      isGlobal: true,
    }),
    AppConfigModule,
    LoggerModule.forRootAsync({
      useFactory: (config: BaseConfig) => {
        return {
          pinoHttp: {
            base: {
              service: 'backend',
            },
            level: config.logLevel,
            genReqId: req => {
              return req.headers['x-request-id'] || randomUUID();
            },
            redact: [
              'req.headers.authorization',
              'res.headers["set-cookie"]',
              'req.headers.cookie',
            ],
            transport:
              config.nodeEnv === 'production'
                ? undefined
                : {
                    target: 'pino-pretty',
                    options: {
                      colorize: true,
                    },
                  },
          },
        };
      },
      inject: [BaseConfig],
    }),
    HealthModule,
    ScheduleModule.forRoot(),
    SyncModule,
  ],
  providers: [
    BaseConfig,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        exceptionFactory: errors => new BadRequestException(errors),
      }),
    },
  ],
  controllers: [AppController],
})
export class AppModule {}

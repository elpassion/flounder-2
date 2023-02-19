import { StorageModule } from '@flounder/storage';
import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { randomUUID } from 'crypto';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../domain/admin/admin.module';
import { UsersModule } from '../domain/users/users.module';
import { AppConfigModule, BaseConfig, StorageConfig } from '../modules/app-config';
import { DatabaseModule } from '../modules/database/database.module';
import { EmailSendingProcessorModule } from '../modules/email-sending-processor/email-sending-processor.module';
import { EmailSubscriptionsModule } from '../modules/email-subscriptions/email-subscriptions.module';
import { EventsModule } from '../modules/events/events.module';
import { FeatureFlagsModule } from '../modules/feature-flags/feature-flags.module';
import { FilesTemporaryModule } from '../modules/files-temporary/files-temporary.module';
import { HealthModule } from '../modules/health/health.module';
import { NotificationsProcessor } from '../modules/notifications-processor/notifications-processor.module';
import { QueueModule } from '../modules/queue/queue.module';
import { TranslationModule } from '../modules/translation/translation.module';
import { AppController } from './app.controller';
import { ExceptionHandler } from './exception-handler';
import { TranslationHttpExceptionFilter } from './translation-http-exception.filter';
import { RegistrationModule } from '../modules/registration/registration.module';
import { SendEmailModule } from '../modules/send-email/send-email.module';
import { ORMProvider, PaginationModule } from '@flounder/pagination';

@Module({
  imports: [
    // Global Modules
    PaginationModule.register({
      provider: ORMProvider.TYPEORM,
    }),
    ConfigModule.forRoot({
      envFilePath: [
        `apps/backend/.env.${process.env.NODE_ENV || 'development'}.local`,
        'apps/backend/.env',
        `apps/backend/.env.${process.env.NODE_ENV || 'development'}`,
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
    StorageModule.registerAsync({
      useClass: StorageConfig,
      isGlobal: true,
    }),

    // Non-global Modules
    AdminModule,
    AuthModule,
    DatabaseModule,
    EmailSendingProcessorModule,
    EmailSubscriptionsModule,
    EventsModule,
    FeatureFlagsModule,
    FilesTemporaryModule,
    HealthModule,
    NotificationsProcessor,
    QueueModule,
    TranslationModule,
    UsersModule,
    FeatureFlagsModule,
    FilesTemporaryModule,
    RegistrationModule,
    SendEmailModule,
  ],
  providers: [
    BaseConfig,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        exceptionFactory: errors => new BadRequestException(errors),
      }),
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
    {
      provide: APP_FILTER,
      useClass: TranslationHttpExceptionFilter,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}

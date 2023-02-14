import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { LoggerModule } from 'nestjs-pino';
import { AppConfigModule, BaseConfig } from '../app-config';
import { HealthModule } from '../health/health.module';
import { AppController } from './app.controller';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
})
export class AppModule {}

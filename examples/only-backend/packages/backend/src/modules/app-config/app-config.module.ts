import { BadRequestException, Global, Module, ValidationPipe } from '@nestjs/common';
import { BaseConfig } from './base-config.service';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `packages/backend/.env.${process.env.NODE_ENV || 'development'}.local`,
        'packages/backend/.env',
        `packages/backend/.env.${process.env.NODE_ENV || 'development'}`,
      ],
      cache: true,
      isGlobal: true,
    }),
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
  exports: [BaseConfig],
})
export class AppConfigModule {}

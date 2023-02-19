import { NestFactory } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { BaseConfig } from './modules/app-config';
import { AppModule } from './app/app.module';
import { QueueConfig } from './modules/queue/queue.config';
import { BullBoard } from './modules/queue/bull-board';
import { Swagger } from './modules/swagger/swagger-ui';
import { CognitoConfig } from './auth/cognito/cognito.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const baseConfig = app.get(BaseConfig);
  const authConfig = app.get(CognitoConfig);

  app.enableCors(baseConfig.corsOptions);
  app.setGlobalPrefix('/api');

  const queueConfig = app.get(QueueConfig);
  new BullBoard(
    app,
    queueConfig.bullBoardUser,
    queueConfig.bullBoardPassword,
    '/bull-board',
  ).setup();

  new Swagger(
    app,
    authConfig.publicUserPoolId,
    authConfig.publicApiClientId,
    baseConfig.apiUrl,
  ).build();

  await app.listen(baseConfig.port);
}
bootstrap();

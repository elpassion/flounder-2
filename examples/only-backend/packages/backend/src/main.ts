import { NestFactory } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { BaseConfig } from './modules/app-config';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const baseConfig = app.get(BaseConfig);

  app.enableCors(baseConfig.corsOptions);
  app.setGlobalPrefix('/api');

  await app.listen(baseConfig.port);
}

bootstrap();

import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { NodeEnvironment } from '../../shared/common/configuration/node-environment';
import { ConfigValidator } from '../../shared/common/configuration/config.validator';

class BaseEnvVariables {
  @IsEnum(NodeEnvironment)
  @Expose()
  NODE_ENV!: NodeEnvironment;

  @IsNumber()
  @Expose()
  API_PORT!: number;

  @IsString()
  @Expose()
  API_ALLOWED_ORIGINS!: string;

  @IsString()
  @Expose()
  API_URL!: string;

  @IsOptional()
  @IsString()
  @Expose()
  LOG_LEVEL?: string;
}

@Injectable()
export class BaseConfig {
  readonly version!: string;
  readonly nodeEnv: string;
  readonly port: number;
  readonly corsOptions: CorsOptions;
  readonly apiUrl: string;
  readonly logLevel: string;

  constructor(private readonly configService: ConfigService<BaseEnvVariables>) {
    const config = ConfigValidator.validate(BaseEnvVariables, {
      NODE_ENV: configService.get<NodeEnvironment>('NODE_ENV'),
      API_PORT: configService.get<number>('API_PORT'),
      API_ALLOWED_ORIGINS: configService.get<string>('API_ALLOWED_ORIGINS'),
      API_URL: configService.get<string>('API_URL'),
      LOG_LEVEL: configService.get<string>('LOG_LEVEL', 'info'),
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.version = process.env.npm_package_version!;
    this.nodeEnv = config.NODE_ENV;
    this.port = config.API_PORT;
    this.corsOptions = { origin: config.API_ALLOWED_ORIGINS.split(',') };
    this.apiUrl = config.API_URL;
    this.logLevel = config.LOG_LEVEL!;
  }
}

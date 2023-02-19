import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ConfigValidator } from '../../shared/common/configuration/config.validator.ts';

class QueueConfigEnvVariables {
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly REDIS_HOST!: string;

  @IsNotEmpty()
  @IsInt()
  @Expose()
  readonly REDIS_PORT!: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly BULL_BOARD_USER!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly BULL_BOARD_PASSWORD!: string;
}

@Injectable()
export class QueueConfig {
  readonly redisHost: string;
  readonly redisPort: number;

  readonly bullBoardUser: string;
  readonly bullBoardPassword: string;

  constructor(configService: ConfigService<QueueConfigEnvVariables>) {
    const queueConfig = ConfigValidator.validate(QueueConfigEnvVariables, {
      REDIS_HOST: configService.get('REDIS_HOST'),
      REDIS_PORT: configService.get('REDIS_PORT'),
      BULL_BOARD_USER: configService.get('BULL_BOARD_USER'),
      BULL_BOARD_PASSWORD: configService.get('BULL_BOARD_PASSWORD'),
    });

    this.redisHost = queueConfig.REDIS_HOST;
    this.redisPort = queueConfig.REDIS_PORT;

    this.bullBoardUser = queueConfig.BULL_BOARD_USER;
    this.bullBoardPassword = queueConfig.BULL_BOARD_PASSWORD;
  }
}

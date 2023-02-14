import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigValidator } from '../../../shared/common/configuration/config.validator';

class SyncConfigVariables {
  @IsNotEmpty()
  @IsString()
  @Expose()
  FLOAT_TOKEN!: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  FLOAT_TIMEOFF_TYPE_ID!: number;
}

@Injectable()
export class SyncFloatConfig {
  readonly floatToken: string;
  readonly floatTimeoffTypeId: number;

  constructor(configService: ConfigService) {
    const { FLOAT_TOKEN, FLOAT_TIMEOFF_TYPE_ID } = ConfigValidator.validate(SyncConfigVariables, {
      FLOAT_TOKEN: configService.get('FLOAT_TOKEN'),
      FLOAT_TIMEOFF_TYPE_ID: configService.get('FLOAT_TIMEOFF_TYPE_ID'),
    });

    this.floatToken = FLOAT_TOKEN;
    this.floatTimeoffTypeId = FLOAT_TIMEOFF_TYPE_ID;
  }
}

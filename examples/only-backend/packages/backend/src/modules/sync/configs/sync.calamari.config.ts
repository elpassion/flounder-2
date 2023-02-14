import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigValidator } from '../../../shared/common/configuration/config.validator.ts.ts';

class SyncConfigVariables {
  @IsNotEmpty()
  @IsString()
  @Expose()
  CALAMARI_API_URL!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  CALAMARI_API_KEY!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  CALAMARI_API_USERNAME!: string;
}

@Injectable()
export class SyncCalamariConfig {
  readonly calamariApiUrl: string;
  readonly calamariApiKey: string;
  readonly calamariApiUsername: string;

  constructor(configService: ConfigService) {
    const { CALAMARI_API_USERNAME, CALAMARI_API_KEY, CALAMARI_API_URL } = ConfigValidator.validate(
      SyncConfigVariables,
      {
        CALAMARI_API_URL: configService.get('CALAMARI_API_URL'),
        CALAMARI_API_KEY: configService.get('CALAMARI_API_KEY'),
        CALAMARI_API_USERNAME: configService.get('CALAMARI_API_USERNAME'),
      },
    );

    this.calamariApiUrl = CALAMARI_API_URL;
    this.calamariApiKey = CALAMARI_API_KEY;
    this.calamariApiUsername = CALAMARI_API_USERNAME;
  }
}

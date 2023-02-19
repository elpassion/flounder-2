import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ConfigValidator } from '../../shared/common/configuration/config.validator.ts';
import { FeatureFlagsEnum } from '@flounder/contracts';

class FeatureFlagsEnvVariables {
  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  @Transform(({ value }) => value === 'true')
  DIFFERENT_EMAIL_TEXT!: boolean;
}

@Injectable()
export class FeatureFlagsProviderConfig {
  [FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT]!: boolean;

  constructor(configService: ConfigService) {
    const config = ConfigValidator.validate(FeatureFlagsEnvVariables, {
      [FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT]: configService.get(
        `FEATURE_FLAG_${FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT}`,
      ),
    });

    this[FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT] = config[FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT];
  }

  enableFlag(flagName: FeatureFlagsEnum): void {
    this[flagName] = true;
  }

  disableFlag(flagName: FeatureFlagsEnum): void {
    this[flagName] = false;
  }
}

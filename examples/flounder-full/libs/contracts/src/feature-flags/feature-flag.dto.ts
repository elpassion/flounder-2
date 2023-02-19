import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { FeatureFlagsEnum } from './feature-flags.enum';

export class FeatureFlagDto {
  @IsNotEmpty()
  @IsEnum(FeatureFlagsEnum)
  name!: FeatureFlagsEnum;

  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;
}

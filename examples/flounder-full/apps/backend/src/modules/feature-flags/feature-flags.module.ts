import { Module } from '@nestjs/common';
import { FeatureFlagsFacade } from './feature-flags.facade';
import { FeatureFlagsProviderConfig } from './feature-flags-config.provider';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [],
  providers: [FeatureFlagsFacade, FeatureFlagsProviderConfig],
  exports: [FeatureFlagsFacade],
  imports: [AuthModule],
})
export class FeatureFlagsModule {}

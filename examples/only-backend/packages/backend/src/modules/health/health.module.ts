import { HttpModule } from '@nestjs/axios';

import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import {
  ExternalServicesAvailableIndicator,
} from './services';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [
    ExternalServicesAvailableIndicator,
  ],
})
export class HealthModule {}

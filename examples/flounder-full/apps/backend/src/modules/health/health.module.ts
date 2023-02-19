import { HttpModule } from '@nestjs/axios';

import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { QueueModule } from '../queue/queue.module';
import { HealthController } from './health.controller';
import { migrationExecutorProvider } from './providers/migration-executor.provider';
import {
  ExternalServicesAvailableIndicator,
  MigrationsAppliedIndicator,
  QueueClientsIndicator,
} from './services';

@Module({
  imports: [TerminusModule, HttpModule, QueueModule],
  controllers: [HealthController],
  providers: [
    MigrationsAppliedIndicator,
    ExternalServicesAvailableIndicator,
    migrationExecutorProvider,
    QueueClientsIndicator,
  ],
})
export class HealthModule {}

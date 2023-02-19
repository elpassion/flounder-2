import { Inject, Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { MigrationExecutor } from 'typeorm';
import { MIGRATION_EXECUTOR_TOKEN } from '../providers/migration-executor.provider';

@Injectable()
export class MigrationsAppliedIndicator extends HealthIndicator {
  constructor(
    @Inject(MIGRATION_EXECUTOR_TOKEN)
    private readonly migrationExecutor: MigrationExecutor,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const pendingMigrations = await this.migrationExecutor.getPendingMigrations();
    const isHealthy = pendingMigrations.length === 0;
    const result = this.getStatus(key, isHealthy, { pendingMigrations: pendingMigrations.length });

    if (!isHealthy) throw new HealthCheckError('Migrations pending', result);

    return result;
  }
}

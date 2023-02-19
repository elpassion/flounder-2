import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import {
  MigrationsAppliedIndicator,
  ExternalServicesAvailableIndicator,
  QueueClientsIndicator,
} from './services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class HealthController {
  constructor(
    private readonly healthService: HealthCheckService,
    private readonly dbCheck: TypeOrmHealthIndicator,
    private readonly migrationsCheck: MigrationsAppliedIndicator,
    private readonly httpCheck: ExternalServicesAvailableIndicator,
    private readonly queueClientsCheck: QueueClientsIndicator,
  ) {}

  @Get('/ping')
  @HealthCheck()
  async healthCheck(): Promise<HealthCheckResult> {
    const healthIndicators = [
      async () => this.dbCheck.pingCheck('database'),
      async () => this.migrationsCheck.isHealthy('migrations'),
      // async () => this.httpCheck.isHealthy('External services'),
      async () => this.queueClientsCheck.isHealthy('Queue clients'),
    ];

    return this.healthService.check(healthIndicators);
  }
}

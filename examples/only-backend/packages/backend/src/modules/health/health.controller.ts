import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class HealthController {
  constructor(
    private readonly healthService: HealthCheckService,
  ) {}

  @Get('/ping')
  @HealthCheck()
  async healthCheck(): Promise<HealthCheckResult> {
    return this.healthService.check([]);
  }
}

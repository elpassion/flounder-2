import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { QueueClientHealthCheckFacade } from '../../queue/services/queue-client-health-check.facade';

@Injectable()
export class QueueClientsIndicator extends HealthIndicator {
  constructor(private readonly queueHealthCheck: QueueClientHealthCheckFacade) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = this.queueHealthCheck.isHealthy();
    const result = this.getStatus(key, isHealthy);

    if (!isHealthy) throw new HealthCheckError('Could not connect to any client', result);

    return result;
  }
}

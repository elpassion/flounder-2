import { Injectable } from '@nestjs/common';

import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';

import { servicesToCheck } from '../services-to-check';

export interface IExternalServicesAvailableResponse {
  results: HealthIndicatorResult[];
  isAnyServiceDown: boolean;
}

@Injectable()
export class ExternalServicesAvailableIndicator extends HealthIndicator {
  constructor(private readonly httpCheck: HttpHealthIndicator) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const { results, isAnyServiceDown } = await this.checkIfExternalServicesAvailable();

    if (isAnyServiceDown) throw new HealthCheckError('Service availability problem', results);

    const result = this.getStatus(key, !isAnyServiceDown, { tested: results.length });

    return result;
  }

  async checkIfExternalServicesAvailable(): Promise<IExternalServicesAvailableResponse> {
    const results: HealthIndicatorResult[] = await Promise.all(
      servicesToCheck.map(service => this.httpCheck.pingCheck(service.name, service.url)),
    );

    const isAnyServiceDown: boolean = results.some(
      result => result[Object.keys(result)[0]].status === 'down',
    );

    return {
      results,
      isAnyServiceDown,
    };
  }
}

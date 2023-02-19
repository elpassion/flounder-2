import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QueueNamesEnum } from '../enums/queue-names.enum';
import { CannotConnectToRedisError } from '../errors/cannot-connect-to-redis.error';
import { QueueClientHealthCheckFacade } from '../services/queue-client-health-check.facade';

export interface INotification {
  title: string;
  description: string;
}

@Injectable()
export class NotificationsProducer {
  constructor(
    @InjectQueue(QueueNamesEnum.NOTIFICATIONS) private queue: Queue,
    private readonly clientHealthCheck: QueueClientHealthCheckFacade,
  ) {}

  private checkHealth() {
    if (!this.clientHealthCheck.checkQueueClients(this.queue)) {
      throw new CannotConnectToRedisError();
    }
  }

  async sendNotification(notification: INotification) {
    this.checkHealth();
    this.queue.add(notification);
  }
}

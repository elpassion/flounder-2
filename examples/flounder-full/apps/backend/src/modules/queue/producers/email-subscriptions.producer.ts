import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IEmailObject } from '@flounder/mailer';
import { QueueNamesEnum } from '../enums/queue-names.enum';
import { CannotConnectToRedisError } from '../errors/cannot-connect-to-redis.error';
import { QueueClientHealthCheckFacade } from '../services/queue-client-health-check.facade';

@Injectable()
export class EmailSubscriptionProducer {
  constructor(
    @InjectQueue(QueueNamesEnum.EMAIL_SUBSCRIPTIONS) private queue: Queue,
    private readonly clientHealthCheck: QueueClientHealthCheckFacade,
  ) {}

  async sendNewsletter(email: IEmailObject) {
    if (!this.clientHealthCheck.checkQueueClients(this.queue)) {
      throw new CannotConnectToRedisError();
    }
    await this.queue.add(email);
  }
}

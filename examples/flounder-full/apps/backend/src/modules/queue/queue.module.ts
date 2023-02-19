import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailSubscriptionsQueue } from './queues/email-subscriptions.queue';
import { NotificationsQueue } from './queues/notifications.queue';
import { EmailSubscriptionProducer } from './producers/email-subscriptions.producer';
import { NotificationsProducer } from './producers/notifications.producer';
import { QueueConfigModule } from './queue-config.module';
import { QueueConfig } from './queue.config';
import { QueueClientHealthCheckFacade } from './services/queue-client-health-check.facade';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [QueueConfigModule],
      useFactory: async (queueConfig: QueueConfig) => ({
        redis: {
          host: queueConfig.redisHost,
          port: queueConfig.redisPort,
        },
      }),
      inject: [QueueConfig],
    }),
    EmailSubscriptionsQueue,
    NotificationsQueue,
  ],
  providers: [EmailSubscriptionProducer, NotificationsProducer, QueueClientHealthCheckFacade],
  exports: [EmailSubscriptionProducer, NotificationsProducer, QueueClientHealthCheckFacade],
})
export class QueueModule {}

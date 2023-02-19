import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events/events.module';
import { AuthModule } from '../../auth/auth.module';
import { MailerModule } from '@flounder/mailer';
import { QueueModule } from '../queue/queue.module';
import { WebSocketModule } from '@flounder/websocket';
import { EmailSubscription } from './email-subscription.entity';
import { EmailSubscriptionsController } from './email-subscriptions.controller';
import { EmailSubscriptionsFacade } from './email-subscriptions.facade';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailSubscription]),
    MailerModule,
    QueueModule,
    EventsModule,
    WebSocketModule,
    AuthModule,
  ],
  controllers: [EmailSubscriptionsController],
  providers: [EmailSubscriptionsFacade],
})
export class EmailSubscriptionsModule {}

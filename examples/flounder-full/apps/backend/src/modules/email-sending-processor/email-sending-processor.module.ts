import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { EmailSubscriptionsConsumer } from './consumers/email-subscriptions.consumer';
import { EmailSubscriptionsQueue } from '../queue/queues/email-subscriptions.queue';
import { AuthModule } from '../../auth/auth.module';
import { FeatureFlagsModule } from '../feature-flags/feature-flags.module';
import { MailDispatcherModule } from '../mail-dispatcher/mail-dispatcher.module';

@Module({
  imports: [
    EmailSubscriptionsQueue,
    EventsModule,
    AuthModule,
    FeatureFlagsModule,
    MailDispatcherModule,
  ],
  providers: [EmailSubscriptionsConsumer],
})
export class EmailSendingProcessorModule {}

import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QueueNamesEnum } from '../../queue/enums/queue-names.enum';
import { EventTypeEnum } from '../../events/enums/event-type.enum';
import { EventsFacade } from '../../events/events.facade';
import { EventDetails } from '../../events/interfaces/event-details.type';
import { assertIsDTO } from '../../../shared/common/assert-is-dto';
import { FeatureFlagsEnum } from '@flounder/contracts';
import { FeatureFlagsFacade } from '../../feature-flags/feature-flags.facade';
import { MailDispatcherFacade } from '../../mail-dispatcher/services/mail-dispatcher.facade';
import { IEmailObject } from '@flounder/mailer';

export class EmailSubscriptionJob implements IEmailObject {
  constructor(public to: string, public subject: string, public text: string) {}
}

@Processor(QueueNamesEnum.EMAIL_SUBSCRIPTIONS)
export class EmailSubscriptionsConsumer {
  constructor(
    private readonly ourMailerFacade: MailDispatcherFacade,
    private readonly eventsFacade: EventsFacade,
    private readonly featureFlagsFacade: FeatureFlagsFacade,
  ) {}

  @OnQueueError()
  async onError(err: Error) {
    console.error('Redis error occurred: ', err);
  }

  @Process()
  async sendNewsletter(job: Job<unknown>) {
    const data = await this.assertIsEmailSubscriptionJob(job.data);
    const eventType = EventTypeEnum.NEWSLETTER_SENT;
    const details: EventDetails<typeof eventType> = { email: data.to };

    await this.eventsFacade.create(eventType, details);
    const textLocal = this.featureFlagsFacade.isEnabled(FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT)
      ? 'This is email with different text!'
      : 'Welcome to our newsletter!';
    await this.ourMailerFacade.sendNewsletter(data, textLocal);
  }

  private async assertIsEmailSubscriptionJob(payload: unknown): Promise<EmailSubscriptionJob> {
    return assertIsDTO(EmailSubscriptionJob, payload);
  }
}

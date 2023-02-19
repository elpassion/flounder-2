import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from 'bull';

import {
  EmailSubscriptionJob,
  EmailSubscriptionsConsumer,
} from '../../src/modules/email-sending-processor/consumers/email-subscriptions.consumer';
import { AppModule } from '../../src/app/app.module';
import { Event } from '../../src/modules/events/event.entity';
import { clearDatabase } from '../../__tests-support__/database.cleaner';
import { EventTypeEnum } from '../../src/modules/events/enums/event-type.enum';
import { TestingAppRunner } from '../../__tests-support__/setup-testing-app';
import { mockMailer } from '../../__tests-support__/mocking-mailer';

describe('Email Sending Processor (e2e)', () => {
  const appRunner = new TestingAppRunner([AppModule]);

  beforeAll(async () => {
    mockMailer(appRunner);
    await appRunner.start();
  }, 10000);

  beforeEach(async () => {
    await clearDatabase(appRunner.getApp());
  });

  afterAll(async () => {
    await appRunner.stop();
  });

  describe('email process', () => {
    const sendEmail = () =>
      appRunner
        .getApp()
        .get(EmailSubscriptionsConsumer)
        .sendNewsletter(<Job<EmailSubscriptionJob>>{
          data: {
            to: 'test@test.pl',
            subject: 'subject',
            text: 'body',
          },
        });

    it('should save an newsletter email sent event', async () => {
      // When
      await sendEmail();

      // Then
      const eventsRepository = appRunner.getApp().get(getRepositoryToken(Event));
      const event = await eventsRepository.findOne({
        where: { type: EventTypeEnum.NEWSLETTER_SENT },
      });
      expect(event).not.toBeUndefined();
      expect(event?.details.email).toEqual('test@test.pl');
    });
  });
});

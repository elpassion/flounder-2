import request from 'supertest';
import { TestingAppRunner } from '../../__tests-support__/setup-testing-app';
import { AppModule } from '../../src/app/app.module';
import { MailExampleDto } from '@flounder/contracts';
import { HttpStatus } from '@nestjs/common';
import { clearDatabase } from '../../__tests-support__/database.cleaner';
import { assertEmailWasSentOnce, mockMailer } from '../../__tests-support__/mocking-mailer';

describe('Send-email (e2e)', () => {
  const appRunner = new TestingAppRunner([AppModule]);

  beforeAll(async () => {
    mockMailer(appRunner);
    await appRunner.start();
  });

  afterEach(async () => {
    await clearDatabase(appRunner.getApp());
    appRunner.resetAllMocks();
  });

  afterAll(async () => {
    await appRunner.stop();
  });

  describe('/email/example [POST]', () => {
    const sendEmailParams: MailExampleDto = {
      to: 'example.email@email.com',
      subject: 'Test email subject',
      text: 'Test email body',
    };

    const makeSendEmailRequest = (params: MailExampleDto = sendEmailParams) =>
      request(appRunner.getApp().getHttpServer()).post('/email/example').send(params);

    it('should send an email once', async () => {
      // When
      const response = await makeSendEmailRequest();

      // Then
      expect(response.status).toEqual(HttpStatus.CREATED);
      assertEmailWasSentOnce(appRunner);
    });
  });
});

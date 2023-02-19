import request from 'supertest';
import { HttpStatus } from '@nestjs/common';

import { Role } from '../../src/auth/casl/enums/role.enum';
import { EventTypeEnum } from '../../src/modules/events/enums/event-type.enum';
import { itRequiresAuthorization } from '../../__tests-support__/scenarios/auth.scenario';
import { asAdmin } from '../../__tests-support__/decorators/auth.decorator';
import { EventsFacade } from '../../src/modules/events/events.facade';
import { clearDatabase } from '../../__tests-support__/database.cleaner';
import { TestingAppRunner } from "../../__tests-support__/setup-testing-app";
import { AppModule } from "../../src/app/app.module";

const MOCK_EMAIL = 'example@mail.com';

describe('Events (e2e)', () => {
  const appRunner = new TestingAppRunner([AppModule]);
  let eventsFacade: EventsFacade;

  beforeAll(async () => {
    await appRunner.start();
    eventsFacade = appRunner.getApp().get<EventsFacade>(EventsFacade);
  }, 10000);

  afterEach(async () => {
    await clearDatabase(appRunner.getApp());
  });

  afterAll(async () => {
    await appRunner.stop();
  });

  describe('/events', () => {

    const makeGetEventsRequest = () => request(appRunner.getApp().getHttpServer()).get('/events');

    itRequiresAuthorization(appRunner, makeGetEventsRequest, Role.Admin);

    it('Returns a list of events', async () => {
      // Given
      await createExampleEvent();

      // When
      const { body, statusCode } = await asAdmin(makeGetEventsRequest)().send();

      // Then
      expect(statusCode).toBe(HttpStatus.OK);
      expect(body.data).toEqual([
        {
          id: expect.any(Number),
          type: EventTypeEnum.NEWSLETTER_SENT,
          details: { email: MOCK_EMAIL },
          created_at: expect.any(String),
        },
      ]);
    });

    const createExampleEvent = async () =>
      eventsFacade.create(EventTypeEnum.NEWSLETTER_SENT, { email: MOCK_EMAIL });
  });
});

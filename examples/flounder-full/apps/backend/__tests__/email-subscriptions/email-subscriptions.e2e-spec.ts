import request from 'supertest';
import { HttpStatus } from '@nestjs/common';

import { CreateEmailSubscriptionDto } from "@flounder/contracts";

import { asDefaultUser } from '../../__tests-support__/decorators/auth.decorator';
import { itRequiresAuthorization } from '../../__tests-support__/scenarios/auth.scenario';
import { Role } from '../../src/auth/casl/enums/role.enum';
import { clearDatabase } from '../../__tests-support__/database.cleaner';
import { TestingAppRunner } from "../../__tests-support__/setup-testing-app";
import { assertNewsletterWasSent, mockNewsletter } from "../../__tests-support__/mocking-newsletter";
import { assertNotificationWasSent, mockNotifications } from "../../__tests-support__/mocking-notifications";
import { AppModule } from "../../src/app/app.module";

describe('Email-subscriptions (e2e)', () => {
  const appRunner = new TestingAppRunner([AppModule]);

  beforeAll(async () => {
    mockNewsletter(appRunner);
    mockNotifications(appRunner);

    await appRunner.start();
  }, 10000);

  afterEach(async () => {
    await clearDatabase(appRunner.getApp());

    appRunner.resetAllMocks();
  });

  afterAll(async () => {
    await appRunner.stop();
  });

  describe('/email-subscriptions [POST]', () => {
    const subscriptionParams = {
      email: 'email@example.com',
      agreedToTerms: true,
    };

    const genericResponse = {
      id: expect.any(Number),
      email: subscriptionParams.email,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    };

    const makeCreateSubscriptionRequest = (
      params: CreateEmailSubscriptionDto = subscriptionParams
    ) => request(appRunner.getApp().getHttpServer()).post('/email-subscriptions').send(params);

    describe('when authorized as user', () => {

      itRequiresAuthorization(appRunner, () => makeCreateSubscriptionRequest(), Role.User);

      const createSubscriptionAsUser = (params?: CreateEmailSubscriptionDto) => asDefaultUser( () => makeCreateSubscriptionRequest(params))();

      it('should create a new subscription', async () => {
        // When
        const response = await createSubscriptionAsUser();

        // Then
        expect(response.status).toEqual(HttpStatus.CREATED);
        expect(response.body).toMatchObject(genericResponse);
      });

      it('should call sendNewsletter function', async () => {
        // When
        const response = await createSubscriptionAsUser();

        // Then
        expect(response.status).toEqual(HttpStatus.CREATED);
        assertNewsletterWasSent(appRunner);
      });

      it('should call sendNotification function', async () => {
        // When
        const response = await createSubscriptionAsUser(subscriptionParams);

        // Then
        expect(response.status).toEqual(HttpStatus.CREATED);
        assertNotificationWasSent(appRunner);
      });

      it('should fail on duplicate email', async () => {
        // Given
        await createSubscriptionAsUser();

        // When
        const response = await createSubscriptionAsUser();

        // Then
        expect(response.status).toEqual(HttpStatus.CONFLICT);
      });

      it('should fail on wrong email', async () => {
        // When
        const response = await createSubscriptionAsUser({
          ...subscriptionParams,
          email: 'wrongEmail',
        });

        // Then
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message[0].property).toBe('email');
      });

      it('should fail on empty email', async () => {
        // When
        const response = await createSubscriptionAsUser({
          ...subscriptionParams,
          email: '',
        });

        // Then
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message[0].property).toBe('email');
      });

      it('should fail while terms are not accepted', async () => {
        // When
        const response = await createSubscriptionAsUser({
          ...subscriptionParams,
          agreedToTerms: false,
        });

        // Then
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message[0].property).toBe('agreedToTerms');
      });
    });
  });
});

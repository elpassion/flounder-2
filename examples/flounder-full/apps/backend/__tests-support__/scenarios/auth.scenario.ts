import { Test } from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { Role } from '../../src/auth/casl/enums/role.enum';
import { withToken } from '../decorators/auth.decorator';
import { createUserFixture, defaultUser } from "../../src/domain/users/__tests-support__/user-fixture";
import { TestingAppRunner } from "../setup-testing-app";
import { clearDatabase } from "../database.cleaner";
import { IScenario } from "./scenario.interface";

export const itRequiresAuthorization: IScenario = (
  appRunner: TestingAppRunner,
  makeRequest: (app: INestApplication) => Test,
  grantedRoleLevel: Role,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onBeforeEach: (appRunner: TestingAppRunner) => Promise<void> = async () => {},
) => {
  describe('requires authorization', () => {

    beforeEach(async () => {
      await onBeforeEach(appRunner);
    });

    afterEach(async () => {
      await clearDatabase(appRunner.getApp());
    });

    it('returns status Unauthorized without authorization', async () => {
      // When & Then
      await makeRequest(appRunner.getApp()).expect(HttpStatus.UNAUTHORIZED);
    });

    describe('when authorized', () => {

      if (grantedRoleLevel !== Role.User) {
        it('returns 403 without correct role', async () => {
          // When & Then
          await withToken(makeRequest)(appRunner.getApp()).expect(HttpStatus.FORBIDDEN);
        });
      }

      it('returns positive status with correct role', async () => {
        // Given
        const user = await createUserFixture()
          .withCognitoId(defaultUser.cognito_id)
          .withEmail("dummy@email.com")
          .createAndSaveInDB(appRunner.getApp());

        // When
        const response = await withToken(
          makeRequest,
          builder => builder
                                  .withId(user.cognito_id)
                                  .withEmail(user.email)
                                  .withGroup(grantedRoleLevel)
        )(appRunner.getApp());

        // Then
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBeLessThan(400);
      });
    });
  });
};

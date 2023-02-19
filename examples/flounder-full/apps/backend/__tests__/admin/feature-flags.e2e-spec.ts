import request from 'supertest';
import { HttpStatus } from '@nestjs/common';

import { FeatureFlagsEnum } from '@flounder/contracts';

import { Role } from '../../src/auth/casl/enums/role.enum';
import { clearDatabase } from '../../__tests-support__/database.cleaner';
import { asAdmin } from '../../__tests-support__/decorators/auth.decorator';
import { TestingAppRunner } from "../../__tests-support__/setup-testing-app";
import { itRequiresAuthorization } from '../../__tests-support__/scenarios/auth.scenario';
import { FeatureFlagsProviderConfig } from '../../src/modules/feature-flags/feature-flags-config.provider';
import { AppModule } from "../../src/app/app.module";


describe('Feature Flags (e2e)', () => {
  const appRunner = new TestingAppRunner([AppModule]);
  let featureFlagsProvider: FeatureFlagsProviderConfig;

  beforeAll(async () => {
    await appRunner.start();

    featureFlagsProvider = appRunner.getApp().get(FeatureFlagsProviderConfig);
  }, 10000);

  afterEach(async () => {
    await clearDatabase(appRunner.getApp());
  })

  afterAll(async () => {
    await appRunner.stop();
  });

  describe('/admin/feature-flags [GET]', () => {
    const getFlags = () => request(appRunner.getApp().getHttpServer()).get('/admin/feature-flags');

    itRequiresAuthorization(appRunner, getFlags, Role.Admin);

    it('returns a response object when OK', async () => {
      // When
      const response = await asAdmin(getFlags)();

      // Then
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual({
        data: [
          {
            name: FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT,
            isActive: false,
          },
        ],
        links: {
          current: '',
        },
        meta: {
          currentPage: 0,
          itemsPerPage: 60,
          search: '',
          searchBy: [],
          sortBy: [],
          totalItems: 1,
          totalPages: 1,
        },
      });
    });
  });

  describe('/admin/feature-flags [PUT]', () => {
    const enableFlag = () =>
      request(appRunner.getApp().getHttpServer()).put('/admin/feature-flags').send({
        name: FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT,
        isActive: true,
      });

    const disableFlag = () =>
      request(appRunner.getApp().getHttpServer()).put('/admin/feature-flags').send({
        name: FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT,
        isActive: false,
      });

    itRequiresAuthorization(appRunner, enableFlag, Role.Admin);
    itRequiresAuthorization(appRunner, disableFlag, Role.Admin);

    it('enables and returns an active flag when OK', async () => {
      // When
      const response = await asAdmin(enableFlag)();

      // Then
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual({
        name: FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT,
        isActive: true,
      });
      expect(featureFlagsProvider[FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT]).toBe(true);
    });

    it('disables and returns an inactive flag when OK', async () => {
      // Given
      featureFlagsProvider[FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT] = true;

      // When
      const response = await asAdmin(disableFlag)();

      // Then
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual({
        name: FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT,
        isActive: false,
      });
      expect(featureFlagsProvider[FeatureFlagsEnum.DIFFERENT_EMAIL_TEXT]).toBe(false);
    });
  });
});

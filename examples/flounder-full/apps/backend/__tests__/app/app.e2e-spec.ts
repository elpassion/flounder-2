import request from 'supertest';

import { TestingAppRunner } from "../../__tests-support__/setup-testing-app";
import { VersionDto } from "../../src/app/dtos/version.dto";
import { AppModule } from "../../src/app/app.module";

describe('App (e2e)', () => {
  const appRunner = new TestingAppRunner([AppModule]);

  beforeAll(async () => {
    await appRunner.start();
  }, 10000);

  afterAll(async () => {
    await appRunner.stop();
  });

  describe('/version [GET]', () => {

    it('returns current version of app', async () => {
      // When
      const actualResponse = await request(appRunner.getApp().getHttpServer()).get('/version').send();

      // Then
      const expectedResponseBody: VersionDto = { version: process.env.npm_package_version! };
      expect(actualResponse.body).toEqual(expectedResponseBody);
    });

  });
});

import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app/app.module';
import request from 'supertest';
import { TestingModule } from '@nestjs/testing';
import { createTestingModule } from '../../__tests-support__/testing.module';
import { BullBoard } from '../../src/modules/queue/bull-board';

describe('bull-board (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    new BullBoard(
      app,
      bullBoardCredentials.user,
      bullBoardCredentials.password,
      '/bull-board',
    ).setup();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/bull-board', () => {
    it('Should return unauthorized if does not pass credentials', async () => {
      // When
      const response = await request(app.getHttpServer()).get('/bull-board').send();

      // Then
      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });

    it('Should return unauthorized if user pass invalid credentials', async () => {
      // When
      const response = await request(app.getHttpServer())
        .get('/bull-board')
        .set({ Authorization: `Basic ${base64Credentials}INVALID` })
        .send();

      // Then
      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });

    it('Should return OK if user pass valid credentials', async () => {
      // When
      const response = await request(app.getHttpServer())
        .get('/bull-board')
        .set({ Authorization: `Basic ${base64Credentials}` })
        .send();

      // Then
      expect(response.statusCode).toEqual(HttpStatus.OK);
    });
  });
});

const bullBoardCredentials = {
  user: 'admin',
  password: 'admin',
};

const base64Credentials = Buffer.from(
  `${bullBoardCredentials.user}:${bullBoardCredentials.password}`,
).toString('base64');

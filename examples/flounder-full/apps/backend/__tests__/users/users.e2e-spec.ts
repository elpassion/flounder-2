import request from 'supertest';
import { anyString } from 'ts-mockito';
import { randomUUID } from 'node:crypto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { ExtendedUserDto, UpdateUserDto } from '@flounder/contracts';

import { asAuthenticatedUser } from '../../__tests-support__/decorators/auth.decorator';
import {
  createUserFixture,
  defaultUser,
} from '../../src/domain/users/__tests-support__/user-fixture';
import { TestingAppRunner } from '../../__tests-support__/setup-testing-app';
import {
  assertThatFileWasNotMovedToPermStore,
  mockStoringFiles,
  stubStoredFile,
  stubStoredFileMovedToPermStorage,
  stubStoredFileNotFound,
} from '../../__tests-support__/mocking-storing-files';
import { clearDatabase } from '../../__tests-support__/database.cleaner';
import { mockUsersContext } from '../../__tests-support__/mocking-users-context';
import { User } from '../../src/domain/users/user.entity';
import { itRequiresAuthorization } from '../../__tests-support__/scenarios/auth.scenario';
import { Role } from '../../src/auth/casl/enums/role.enum';
import { assertThatUserEmailWasNotUpdate } from '../../__tests-support__/users/mocking-updating-user-email';
import { AppModule } from '../../src/app/app.module';
import { createPaginationScenario } from '../../__tests-support__/scenarios/pagination.scenario';
import { PaginateQuery } from "@flounder/pagination";

describe('Users (e2e)', () => {
  const appRunner = new TestingAppRunner([AppModule]);

  beforeAll(async () => {
    mockUsersContext(appRunner);
    mockStoringFiles(appRunner);

    await appRunner.start();
  }, 10000);

  afterEach(async () => {
    await clearDatabase(appRunner.getApp());
    appRunner.resetAllMocks();
  });

  afterAll(async () => {
    await appRunner.stop();
  });

  describe('creating a user: /users [POST]', () => {
    const makeCreateUserRequest = () => request(appRunner.getApp().getHttpServer()).post(`/users`);

    itRequiresAuthorization(appRunner, makeCreateUserRequest, Role.User);

    it('should update user email if user already exists with different email than in the DB', async () => {
      // Given
      const user = await createUserFixture()
        .withEmail('different@email.com')
        .createAndSaveInDB(appRunner.getApp());
      const expectedEmail = 'new@email.com';
      const authenticatedUser = { ...user, email: expectedEmail };

      // When
      const response = await asAuthenticatedUser(authenticatedUser, makeCreateUserRequest)();

      // Then
      expect(response.body).toEqual({
        ...response.body,
        cognito_id: user.cognito_id,
        email: expectedEmail,
      });
      expect(response.status).toBe(HttpStatus.CREATED);

      await assertThatUserWasProperlyStored(appRunner.getApp(), user.cognito_id, {
        email: expectedEmail,
      });
    });

    it('if user does not exist in DB it should create a new user using data from encrypted in JWT token', async () => {
      // Given
      const user = createUserFixture().withEmail('dummy@email.com').create();

      // When
      const response = await asAuthenticatedUser(user, makeCreateUserRequest)();

      // Then
      expect(response.status).toBe(HttpStatus.CREATED);

      const actualUser = await getStoredUser(appRunner.getApp(), user.cognito_id);
      const expectedResponseBody = {
        cognito_id: user.cognito_id,
        first_name: null,
        last_name: null,
        avatar_key: null,
        created_at: actualUser.created_at.toISOString(),
        updated_at: actualUser.updated_at.toISOString(),
      };
      expect(response.body).toMatchObject(expectedResponseBody);

      await assertThatUserWasProperlyStored(appRunner.getApp(), user.cognito_id, {
        cognito_id: user.cognito_id,
        email: user.email,
      });
    });
  });

  describe('getting users: /users [GET]', () => {
    const makeGetUsersRequest = (app: INestApplication, dto: Partial<PaginateQuery> = {}) =>
      request(app.getHttpServer()).get('/users').query(dto);

    itRequiresAuthorization(appRunner, () => makeGetUsersRequest(appRunner.getApp()), Role.User);

    createPaginationScenario(
      appRunner,
      () => makeGetUsersRequest(appRunner.getApp(), { limit: 2, page: 2 }),
      Role.User,
      async () => {
        await Promise.all(
          Array.from({ length: 4 }).map((_, i) =>
            createUserFixture()
              .withCognitoId(`user-id-123${i}`)
              .createAndSaveInDB(appRunner.getApp()),
          ),
        );
      },
    )
      .itShouldReturnRequiredShape()
      .itShouldReturnTotalCount(5)
      .itShouldReturnMaxItemsPerPage(2)
      .itShouldReturnTotalPages(3)
      .itShouldEqual([
        {
          avatar_url: null,
          cognito_id: 'user-id-1231',
          description: 'I am John',
          email: expect.any(String),
          first_name: 'John',
          last_name: 'Doe',
        },
        {
          avatar_url: null,
          cognito_id: 'user-id-1230',
          description: 'I am John',
          email: expect.any(String),
          first_name: 'John',
          last_name: 'Doe',
        },
      ])
      .run();

    it('should return a list of users', async () => {
      // Given
      const avatarKey = 'avatar.jpg';
      const user = await createUserFixture()
        .withAvatarKey(avatarKey)
        .createAndSaveInDB(appRunner.getApp());
      const expectedAvatarURL =
        'https://s3.us-west-2.amazonaws.com/156d454b-3766-4443-9023-bd059a9bd036.jpg';
      stubStoredFile(appRunner, avatarKey, expectedAvatarURL);

      // When
      const response = await asAuthenticatedUser(user, makeGetUsersRequest)(appRunner.getApp());

      // Then
      expect(response.status).toEqual(HttpStatus.OK);

      const expectedBodyResponse = {
        data: [
          {
            cognito_id: user.cognito_id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar_url: expectedAvatarURL,
          },
        ],
        links: {
          current: anyString(),
        },
        meta: {
          currentPage: 1,
          itemsPerPage: 20,
          sortBy: [['cognito_id', 'DESC']],
          totalItems: 1,
          totalPages: 1,
        },
      };
      expect(response.body).toMatchObject(expectedBodyResponse);
    });
  });

  describe('getting a user: /users/:id [GET]', () => {
    const makeGetUserRequest = (userId: string) =>
      request(appRunner.getApp().getHttpServer()).get(`/users/${userId}`);

    itRequiresAuthorization(
      appRunner,
      () => makeGetUserRequest('user-id-123'),
      Role.User,
      async () => {
        await createUserFixture()
          .withCognitoId('user-id-123')
          .createAndSaveInDB(appRunner.getApp());
      },
    );

    it('should return 404 when user does not exist', async () => {
      // Given
      const user = await createUserFixture().createAndSaveInDB(appRunner.getApp());
      const notExistingUserId = 'not-existing-user-id';

      // When
      const response = await asAuthenticatedUser(user, makeGetUserRequest)(notExistingUserId);

      // Then
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return 502 when avatar key is bad', async () => {
      // Given
      const avatarKey = 'badkey.jpg';
      const user = await createUserFixture()
        .withAvatarKey(avatarKey)
        .createAndSaveInDB(appRunner.getApp());
      stubStoredFileNotFound(appRunner, avatarKey);

      // When
      const response = await asAuthenticatedUser(user, makeGetUserRequest)(user.cognito_id);

      // Then
      expect(response.status).toBe(HttpStatus.BAD_GATEWAY);
    });

    it('should return user data when proper id is passed', async () => {
      // Given
      const avatarKey = 'avatar-file-name.jpg';
      const user = await createUserFixture()
        .withAvatarKey(avatarKey)
        .createAndSaveInDB(appRunner.getApp());
      const expectedAvatarURL =
        'https://s3.us-west-2.amazonaws.com/156d454b-3766-4443-9023-bd059a9bd036.jpg';
      stubStoredFile(appRunner, avatarKey, expectedAvatarURL);

      // When
      const response = await asAuthenticatedUser(user, makeGetUserRequest)(user.cognito_id);

      // Then
      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toMatchObject({
        cognito_id: user.cognito_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: expectedAvatarURL,
      });
    });
  });

  describe('getting the current user: /users/me [GET]', () => {
    const makeGetCurrentUserRequest = () =>
      request(appRunner.getApp().getHttpServer()).get('/users/me');

    itRequiresAuthorization(appRunner, makeGetCurrentUserRequest, Role.User);

    it('should return current user', async () => {
      // Given
      const user = await createUserFixture()
        .withCognitoId('super-id')
        .withEmail('dummy@email.com')
        .withFirstName('Johny')
        .withLastName('Bravo')
        .withDescription("I'm a dummy user")
        .createAndSaveInDB(appRunner.getApp());
      // When
      const response = await asAuthenticatedUser(
        user,
        makeGetCurrentUserRequest,
      )(appRunner.getApp());

      // Then
      expect(response.status).toBe(HttpStatus.OK);

      const expectedResponseBody: ExtendedUserDto = {
        cognito_id: user.cognito_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: null,
        description: user.description,
      };
      expect(response.body).toMatchObject(expectedResponseBody);
    });
  });

  describe('updating a user: /users/:id [PUT]', () => {
    const makeUpdateUserRequest = (id: string, dto: UpdateUserDto) =>
      request(appRunner.getApp().getHttpServer()).put(`/users/${id}`).send(dto);

    itRequiresAuthorization(
      appRunner,
      () => makeUpdateUserRequest(defaultUser.cognito_id!, { email: 'dummy-new@email.com' }),
      Role.User,
    );

    it('should fail when user is not found in DB', async () => {
      // Given
      const user = await createUserFixture().withCognitoId('user-id').create(); // Not saved in the DB.
      const requestData: UpdateUserDto = {
        email: 'dummy@email.com',
      };

      // When
      const response = await asAuthenticatedUser(user, () =>
        makeUpdateUserRequest(user.cognito_id, requestData),
      )();

      // Then
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should fail when trying to update someone else', async () => {
      // Given
      const firstUser = await createUserFixture()
        .withCognitoId('first-user-id')
        .createAndSaveInDB(appRunner.getApp());
      const secondUser = await createUserFixture()
        .withCognitoId('second-user-id')
        .createAndSaveInDB(appRunner.getApp());
      const requestData: Partial<UpdateUserDto> = {
        email: 'dummy@email.com',
      };

      // When
      const response = await asAuthenticatedUser(firstUser, () =>
        makeUpdateUserRequest(secondUser.cognito_id, requestData),
      )();

      // Then
      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    });

    it.each([
      [{ first_name: true, last_name: 123 }], // Invalid types.
      // [{ invalid: "values" }]              // Invalid structure
    ])('should fail when invalid data is provided(given data: %s)', async requestData => {
      // Given
      const user = await createUserFixture().createAndSaveInDB(appRunner.getApp());

      // When
      const response = await asAuthenticatedUser(
        user,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        () => makeUpdateUserRequest(user.cognito_id, requestData),
      )();

      // Then
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should not try to update user email if it did not change', async () => {
      // Given
      const email = 'super@email.com';
      const user = await createUserFixture().withEmail(email).createAndSaveInDB(appRunner.getApp());

      const requestData: UpdateUserDto = {
        email: email,
      };

      // When
      await asAuthenticatedUser(user, () => makeUpdateUserRequest(user.cognito_id, requestData))();

      // Then
      assertThatUserEmailWasNotUpdate(appRunner, user.cognito_id, email);
    });

    it('should not try to update user avatar if it did not change', async () => {
      // Given
      const avatarKey = `profile-picture-${randomUUID()}.jpg`;
      const user = await createUserFixture()
        .withAvatarKey(avatarKey)
        .createAndSaveInDB(appRunner.getApp());

      const avatarPath = `/users-profiles/${user.cognito_id}/${avatarKey}`;
      stubStoredFileMovedToPermStorage(appRunner, user.cognito_id, avatarKey, avatarPath);

      const requestData: UpdateUserDto = {
        avatar_key: avatarKey,
      };

      // When
      await asAuthenticatedUser(user, () => makeUpdateUserRequest(user.cognito_id, requestData))();

      // Then
      assertThatFileWasNotMovedToPermStore(appRunner, avatarKey, user.cognito_id);
    });

    it('should update user', async () => {
      // Given
      const user = await createUserFixture()
        .withEmail('old@email.com')
        .withFirstName('Old First Name')
        .withLastName('Old Last Name')
        .withAvatarKey('old-avatar.png')
        .withDescription('Old description')
        .createAndSaveInDB(appRunner.getApp());
      const avatarFileName = `profile-picture-${randomUUID()}.jpg`;
      const expectedAvatarPath = `/users-profiles/${user.cognito_id}/${avatarFileName}`;
      stubStoredFileMovedToPermStorage(
        appRunner,
        user.cognito_id,
        avatarFileName,
        expectedAvatarPath,
      );

      const requestData: UpdateUserDto = {
        email: 'new@email.com',
        first_name: 'New first name',
        last_name: 'New last name',
        avatar_key: avatarFileName,
        description: 'New description',
      };

      // When
      const response = await asAuthenticatedUser(user, () =>
        makeUpdateUserRequest(user.cognito_id, requestData),
      )();

      // Then
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual({
        cognito_id: user.cognito_id,
        email: requestData.email,
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        updated_at: expect.any(String),
        avatar_key: expectedAvatarPath,
        description: requestData.description,
      });

      const expectedUser = {
        cognito_id: user.cognito_id,
        email: requestData.email,
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        avatar_key: expectedAvatarPath,
      };
      await assertThatUserWasProperlyStored(appRunner.getApp(), user.cognito_id, expectedUser);
    });
  });

  const getStoredUser = async (app: INestApplication, userId: string): Promise<User> => {
    const usersRepository = app.get(getRepositoryToken(User));
    return usersRepository.findOne({ where: { cognito_id: userId } });
  };

  const assertThatUserWasProperlyStored = async (
    app: INestApplication,
    userId: string,
    expectedStoredUserProperties: Partial<User>,
  ): Promise<void> => {
    const actualStoredUser = await getStoredUser(app, userId);

    expect(actualStoredUser).not.toBeNull();
    expect(actualStoredUser).toMatchObject(expectedStoredUserProperties);
  };
});

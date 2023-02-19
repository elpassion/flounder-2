import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { anyString, anything } from 'ts-mockito';
import { GetUserDto, UpdateUserDto } from '@flounder/contracts';

import { Role } from '../../src/auth/casl/enums/role.enum';
import { clearDatabase } from '../../__tests-support__/database.cleaner';
import { asAdmin } from '../../__tests-support__/decorators/auth.decorator';
import { itRequiresAuthorization } from '../../__tests-support__/scenarios/auth.scenario';
import { TestingAppRunner } from "../../__tests-support__/setup-testing-app";
import {
  mockUsersContext
} from "../../__tests-support__/mocking-users-context";
import { mockStoringFiles } from "../../__tests-support__/mocking-storing-files";
import { createUserFixture } from "../../src/domain/users/__tests-support__/user-fixture";
import {
  stubUserGroups,
  throwCognitoErrorWhileFetchingGroups
} from "../../__tests-support__/users/mocking-fetching-users-groups";
import {
  stubFetchedUser,
  throwCognitoErrorWhileFetchingUser, throwUserNotFoundErrorWhileFetchingUser
} from "../../__tests-support__/users/mocking-fetching-users";
import {
  mockBlockingUser,
  mockUnblockingUser,
  throwCognitoErrorWhileBlockingUser,
  throwCognitoErrorWhileUnblockingUser,
  throwUserNotFoundErrorWhileBlockingUser,
  throwUserNotFoundErrorWhileUnblockingUser
} from "../../__tests-support__/users/mocking-blocking-users";
import {
  mockAddingUserToGroup,
  mockRemovingUserFromGroup, throwCognitoErrorWhileAddingUserToGroup,
  throwCognitoErrorWhileRemovingUserFromGroup, throwGroupNotFoundErrorWhileAddingUserToGroup,
  throwGroupNotFoundErrorWhileRemovingUserFromGroup, throwUserNotFoundErrorWhileAddingUserToGroup,
  throwUserNotFoundErrorWhileRemovingUserFromGroup
} from "../../__tests-support__/users/mocking-updating-user-group";
import {AppModule} from "../../src/app/app.module";
import {getStoredUser} from "../../__tests-support__/users/getStoredUser";

describe('Admin Users (e2e)', () => {
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

  describe('/admin/groups [GET]', () => {
    const expectedGroupNames = ['admin-group', 'user-group'];

    beforeEach(() => {
      stubUserGroups(appRunner, expectedGroupNames.map((name) => ({ GroupName: name })))
    });

    const makeGetGroupsRequest = () => request(appRunner.getApp().getHttpServer()).get('/admin/groups');

    itRequiresAuthorization(appRunner, makeGetGroupsRequest, Role.Admin);

    it('should return 502 in case of Cognito error', async () => {
      // Given
      throwCognitoErrorWhileFetchingGroups(appRunner);

      // When
      const response = await asAdmin(makeGetGroupsRequest)();

      // Then
      expect(response.status).toBe(HttpStatus.BAD_GATEWAY);
    });

    it('should return a list of groups', async () => {
      // When
      const response = await asAdmin(makeGetGroupsRequest)();

      // Then
      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toMatchObject(expectedGroupNames);
    });
  });

  describe('/admin/users [GET]', () => {

    const makeGetUsersRequest = () => request(appRunner.getApp().getHttpServer()).get('/admin/users');

    itRequiresAuthorization(appRunner, makeGetUsersRequest, Role.User);

    it('should return a list of users', async () => {
      // When
      const response = await asAdmin(makeGetUsersRequest)();

      // Then
      expect(response.status).toEqual(HttpStatus.OK);

      const expectedResponseBody = {
        data: anything(),
        links: {
          current: anyString(),
        },
        meta: {
          currentPage: 1,
          itemsPerPage: 20,
          sortBy: [['cognito_id', 'DESC']],
          totalItems: 0,
          totalPages: 0,
        },
      };
      expect(response.body).toMatchObject(expectedResponseBody);
    });
  });

  describe('/admin/users/:id [GET]', () => {

    const makeGetUserRequest = (userId: string) => request(appRunner.getApp().getHttpServer()).get(`/admin/users/cognito/${userId}`);

    itRequiresAuthorization(
      appRunner,
      () => makeGetUserRequest("user-id-123"),
      Role.Admin,
      async (appRunner: TestingAppRunner) => stubFetchedUser(appRunner, "user-id-123", [])
    );

    it('should return 404 in case of missing user', async () => {
      // Given
      const notExistingUserId = "456";
      throwUserNotFoundErrorWhileFetchingUser(appRunner, notExistingUserId);

      // When
      const response = await asAdmin(makeGetUserRequest)(notExistingUserId);

      // Then
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return 502 in case of Cognito error', async () => {
      // Given
      const userId = "789";
      throwCognitoErrorWhileFetchingUser(appRunner, userId);

      // When
      const response = await asAdmin(makeGetUserRequest)(userId);

      // Then
      expect(response.status).toBe(HttpStatus.BAD_GATEWAY);
    });

    it('should return specific user when id is passed', async () => {
      // Given
      const userId = "123";
      const groupsNames: string[] = [];
      stubFetchedUser(appRunner, userId, groupsNames);

      // When
      const response = await asAdmin(makeGetUserRequest)(userId);

      // Then
      expect(response.status).toEqual(HttpStatus.OK);

      const expectedResponseBody  = {
        id: userId,
        groups: groupsNames.map((name) => ({ GroupName: name })),
      };
      expect(response.body).toMatchObject(expectedResponseBody);
    });
  });

  describe('/admin/users/:id [PATCH]', () => {

    const makeUpdateUserRequest = (id: string, dto: UpdateUserDto) => request(appRunner.getApp().getHttpServer()).patch(`/admin/users/${id}`).send(dto);

    itRequiresAuthorization(
      appRunner,
      () => makeUpdateUserRequest("updated-user-id", { email: 'new@example.com' }),
      Role.Admin,
      async () => {
        await createUserFixture().withCognitoId("updated-user-id").createAndSaveInDB(appRunner.getApp());
      }
    );

    it('should fail when user is not found', async () => {
      // Given
      const notExistingUserId = '123';
      const validRequestData: UpdateUserDto = {
        email: 'newemail@example.com',
      };

      // When
      const response = await asAdmin(() => makeUpdateUserRequest(notExistingUserId, validRequestData))();

      // Then
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should fail when invalid data is provided', async () => {
      // Given
      const user = await createUserFixture()
        .withCognitoId("123")
        .withEmail("user@example.com")
        .createAndSaveInDB(appRunner.getApp())
      ;
      const invalidRequestData = {
        first_name: true,
        last_name: 123,
      };

      // When
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const response = await asAdmin(() => makeUpdateUserRequest(user.cognito_id, invalidRequestData))();

      // Then
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should update user', async () => {
      // Given
      const user = await createUserFixture()
        .withCognitoId("123")
        .withEmail("user@example.com")
        .createAndSaveInDB(appRunner.getApp())
      ;

      const validRequestData: UpdateUserDto = {
        email: 'newemail@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar_key: 'avatar-key',
      };

      // When
      const response = await asAdmin(() => makeUpdateUserRequest(user.cognito_id, validRequestData))();

      // Then
      expect(response.status).toBe(HttpStatus.OK);
      const expectedResponseBody: Partial<GetUserDto> = {
        email: validRequestData.email,
        first_name: validRequestData.first_name,
        last_name: validRequestData.last_name,
      };
      expect(response.body).toMatchObject({ ...expectedResponseBody, updated_at: expect.any(String) });
    });
  });

  describe('/admin/user/:id/description [PUT]', () => {
    const makeUpdateUserDescriptionRequest = (id: string, dto: UpdateUserDto) =>
      request(appRunner.getApp().getHttpServer()).put(`/admin/users/${id}/description`).send(dto);

    itRequiresAuthorization(
      appRunner,
      () => makeUpdateUserDescriptionRequest('updated-user-id', { description: 'new description' }),
      Role.Admin,
      async () => {
        await createUserFixture()
          .withCognitoId('updated-user-id')
          .createAndSaveInDB(appRunner.getApp());
      },
    );

    it('should fail when user is not found', async () => {
      // Given
      const notExisting = '123';
      const validRequestData: UpdateUserDto = {
        description: 'new description',
      };

      // When
      const response = await asAdmin(() =>
        makeUpdateUserDescriptionRequest(notExisting, validRequestData),
      )();

      // Then
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should update description', async () => {
      // Given
      const user = await createUserFixture()
        .withCognitoId('123')
        .withDescription('old description')
        .createAndSaveInDB(appRunner.getApp());
      const updatedDescription = 'new description';

      // When
      const response = await asAdmin(() =>
        makeUpdateUserDescriptionRequest(user.cognito_id, { description: updatedDescription }),
      )();


      // Then
      const actualUser = await getStoredUser(appRunner.getApp(), user.cognito_id);

      expect(response.status).toBe(HttpStatus.OK);
      expect(actualUser.description).toEqual(updatedDescription);
    });
  });

  describe('blocking', () => {

    describe('/admin/users/:id/block [PUT]', () => {
      const makeBlockUserRequest = (id: string) => request(appRunner.getApp().getHttpServer()).put(`/admin/users/${id}/block`);

      itRequiresAuthorization(
        appRunner,
        () => makeBlockUserRequest("user-id-123"),
        Role.Admin,
        async () => {
          await createUserFixture().withCognitoId("user-id-123").createAndSaveInDB(appRunner.getApp());
        }
      );

      it('should return 404 when incorrect username', async () => {
        // Given
        const userId = "not-existing-user-id";
        throwUserNotFoundErrorWhileBlockingUser(appRunner, userId);

        // When
        const response = await asAdmin(makeBlockUserRequest)(userId);

        // Then
        expect(response.status).toBe(HttpStatus.NOT_FOUND);
      });

      it('should return 502 when gateway not available', async () => {
        // Given
        const userId = "dummy-user-id";
        throwCognitoErrorWhileBlockingUser(appRunner, userId);

        // When
        const response = await asAdmin(makeBlockUserRequest)(userId);

        // Then
        expect(response.status).toBe(HttpStatus.BAD_GATEWAY);
      });

      it('should block an user', async () => {
        const userId = "user-id-123";
        mockBlockingUser(appRunner, userId);

        // When
        const response = await asAdmin(makeBlockUserRequest)(userId);

        // Then
        expect(response.status).toBe(HttpStatus.OK);
      });
    });

    describe('/admin/users/:id/block [DELETE]', () => {

      const makeUnblockUserRequest = (id: string) => request(appRunner.getApp().getHttpServer()).delete(`/admin/users/${id}/block`);

      itRequiresAuthorization(
        appRunner,
        () => makeUnblockUserRequest("user-id-123"),
        Role.Admin,
        async () => {
          await createUserFixture().withCognitoId("user-id-123").createAndSaveInDB(appRunner.getApp());
        }
      );

      it('should return 404 when incorrect user id', async () => {
        // Given
        const userId = "dummy-user-id";
        throwUserNotFoundErrorWhileUnblockingUser(appRunner, userId);

        // When
        const response = await asAdmin(makeUnblockUserRequest)(userId);

        // Then
        expect(response.status).toBe(HttpStatus.NOT_FOUND);
      });

      it('should return 502 when gateway not available', async () => {
        // Given
        const userId = "dummy-user-id";
        throwCognitoErrorWhileUnblockingUser(appRunner, userId);

        // When
        const response = await asAdmin(makeUnblockUserRequest)(userId);

        // Then
        expect(response.status).toBe(HttpStatus.BAD_GATEWAY);
      });

      it('should unblock an user', async () => {
        // Given
        const userId = "dummy-user-id";
        mockUnblockingUser(appRunner, userId);

        // When
        const response = await asAdmin(makeUnblockUserRequest)(userId);

        // Then
        expect(response.status).toBe(HttpStatus.OK);
      });
    });
  });

  describe('changing group membership', () => {

    describe('/admin/users/:id/memberships/:groupName [PUT]', () => {

      const makeAddUserToGroupRequest = (id: string, groupName: string) => request(appRunner.getApp().getHttpServer()).put(`/admin/users/${id}/memberships/${groupName}`);

      itRequiresAuthorization(
        appRunner,
        () => makeAddUserToGroupRequest("user-id-123", "admin-group"),
        Role.Admin,
        async () => {
          await createUserFixture().withCognitoId("user-id-123").createAndSaveInDB(appRunner.getApp());
        }
      );

      it('should return 404 when incorrect user id', async () => {
        // Given
        const userId = "not-existing-user-id";
        const groupName = "admin-group";
        throwUserNotFoundErrorWhileAddingUserToGroup(appRunner, userId, groupName);

        // When
        const response = await asAdmin(makeAddUserToGroupRequest)(userId, groupName);

        // Then
        expect(response.status).toBe(HttpStatus.NOT_FOUND);
      });

      it('should return 404 when group does not exist', async () => {
        // Given
        const userId = "user-id-123";
        const groupName = "not-existing-group-name";
        throwGroupNotFoundErrorWhileAddingUserToGroup(appRunner, userId, groupName);

        // When
        const response = await asAdmin(makeAddUserToGroupRequest)(userId, groupName);

        // Then
        expect(response.status).toBe(HttpStatus.NOT_FOUND);
      });

      it('should return 502 when gateway not available', async () => {
        // Given
        const userId = "user-id-123";
        const groupName = "group-name";
        throwCognitoErrorWhileAddingUserToGroup(appRunner, userId, groupName);

        // When
        const response = await asAdmin(makeAddUserToGroupRequest)(userId, groupName);

        // Then
        expect(response.status).toBe(HttpStatus.BAD_GATEWAY);
      });

      it('should add a user to group', async () => {
        // Given
        const userId = "user-id-123";
        const groupName = "group-name";
        mockAddingUserToGroup(appRunner, userId, groupName);

        // When
        const response = await asAdmin(makeAddUserToGroupRequest)(userId, groupName);

        // Then
        expect(response.status).toBe(HttpStatus.OK);
      });
    });

    describe('/admin/users/:id/memberships/:groupName [DELETE]', () => {

      const makeRemoveUserFromGroupRequest = (id: string, groupName: string) => request(appRunner.getApp().getHttpServer()).delete(`/admin/users/${id}/memberships/${groupName}`);

      itRequiresAuthorization(
        appRunner,
        () => makeRemoveUserFromGroupRequest("user-id-123", "admin-group"),
        Role.Admin,
        async () => {
          await createUserFixture().withCognitoId("user-id-123").createAndSaveInDB(appRunner.getApp())
        }
      );

      it('should return 404 when incorrect user id', async () => {
        // Given
        const userId = "not-existing-user-id";
        const groupName = "admin-group";
        throwUserNotFoundErrorWhileRemovingUserFromGroup(appRunner, userId, groupName);

        // When
        const response = await asAdmin(makeRemoveUserFromGroupRequest)(userId, groupName);

        // Then
        expect(response.status).toBe(HttpStatus.NOT_FOUND);
      });

      it('should return 404 when group does not exist', async () => {
        // Given
        const userId = "user-id-123";
        const groupName = "not-existing-group-name";
        throwGroupNotFoundErrorWhileRemovingUserFromGroup(appRunner, userId, groupName);

        // When
        const response = await asAdmin(makeRemoveUserFromGroupRequest)(userId, groupName);

        // Then
        expect(response.status).toBe(HttpStatus.NOT_FOUND);
      });

      it('should return 502 when gateway not available', async () => {
        // Given
        const userId = "user-id-123";
        const groupName = "group-name";
        throwCognitoErrorWhileRemovingUserFromGroup(appRunner, userId, groupName);

        // When
        const response = await asAdmin(makeRemoveUserFromGroupRequest)(userId, groupName);

        // Then
        expect(response.status).toBe(HttpStatus.BAD_GATEWAY);
      });

      it('should add a user to group', async () => {
        // Given
        const userId = "user-id-123";
        const groupName = "group-name";
        mockRemovingUserFromGroup(appRunner, userId, groupName);

        // When
        const response = await asAdmin(makeRemoveUserFromGroupRequest)(userId, groupName);

        // Then
        expect(response.status).toBe(HttpStatus.OK);
      });
    });
  });
});

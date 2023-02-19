import { ResourceNotFoundError } from '../../../shared/errors/resource-not-found.error';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { AppModule } from '../../../app/app.module';
import { CognitoAdapter } from '../cognito.adapter';
import { withRecording } from '../../../../__tests-support__/tapes/withRecording';
import { TestingAppRunner } from "../../../../__tests-support__/setup-testing-app";

describe('CognitoAdapter', function () {
  const appRunner = new TestingAppRunner([AppModule]);

  beforeAll(async () => {
    await appRunner.start();
  });

  afterAll(async () => {
    await appRunner.stop();
  });

  describe('getGroups', function () {
    it('returns groups response', async () => {
      await withRecording(__dirname, 'getGroups success', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When
        const result = await adapter.getGroups();

        // Then
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('get a single user', function () {
    it('fails with 404 when user not found', async () => {
      await withRecording(__dirname, 'user not found', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When && Then
        await expect(adapter.getUserById('invalid')).rejects.toThrowError(UserNotFoundError);
      });
    });

    it('fails when invalid type of userId passed', async () => {
      await withRecording(__dirname, 'with no userId', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(adapter.getUserById()).rejects.toThrowErrorMatchingInlineSnapshot(
          `"InvalidParameterException : 1 validation error detected: Value at 'username' failed to satisfy constraint: Member must not be null"`,
        );
      });
    });

    it('resolves when OK', async () => {
      await withRecording(__dirname, 'return single user', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When
        const result = await adapter.getUserById('0d92b533-0cc1-4b0f-9e74-139d43e20c1c');

        // Then
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('update user email', function () {
    it('fails when invalid type of userId passed', async () => {
      await withRecording(__dirname, 'no userId update', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(adapter.updateUserEmail()).rejects.toThrowErrorMatchingInlineSnapshot(
          `"InvalidParameterException : 1 validation error detected: Value at 'username' failed to satisfy constraint: Member must not be null"`,
        );
      });
    });

    it('fails when invalid type of email passed', async () => {
      await withRecording(__dirname, 'wrong email update', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(
          adapter.updateUserEmail('0d92b533-0cc1-4b0f-9e74-139d43e20c1c', 'invalid'),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"InvalidParameterException : Invalid email address format."`,
        );
      });
    });

    it('resolves when OK', async () => {
      await withRecording(__dirname, 'update email', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When
        const result = await adapter.updateUserEmail(
          '0d92b533-0cc1-4b0f-9e74-139d43e20c1c',
          'user@example.com',
        );

        // Then
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('block user', function () {
    it('should fail with 404 when user does not exist', async () => {
      await withRecording(__dirname, 'block user not found', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(() => adapter.blockUser('invalid')).rejects.toThrowError(UserNotFoundError);
      });
    });

    it('fails when invalid type of userId passed', async () => {
      await withRecording(__dirname, 'with no userId', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(adapter.blockUser()).rejects.toThrowErrorMatchingInlineSnapshot(
          `"InvalidParameterException : 1 validation error detected: Value at 'username' failed to satisfy constraint: Member must not be null"`,
        );
      });
    });

    it('should resolve when ok', async () => {
      await withRecording(__dirname, 'user found', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(adapter.blockUser('0d92b533-0cc1-4b0f-9e74-139d43e20c1c')).toResolve();
      });
    });
  });

  describe('unblock user', function () {
    it('should fail with 404 when user does not exist', async () => {
      await withRecording(__dirname, 'unblock user not found', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(() => adapter.unblockUser('invalid')).rejects.toThrowError(
          new UserNotFoundError(),
        );
      });
    });

    it('should resolve when ok', async () => {
      await withRecording(__dirname, 'unblock user found', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(adapter.unblockUser('0d92b533-0cc1-4b0f-9e74-139d43e20c1c')).toResolve();
      });
    });

    it('fails when invalid type of userId passed', async () => {
      await withRecording(__dirname, 'unblock with no userId', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(adapter.unblockUser()).rejects.toThrowErrorMatchingInlineSnapshot(
          `"InvalidParameterException : 1 validation error detected: Value at 'username' failed to satisfy constraint: Member must not be null"`,
        );
      });
    });
  });

  describe('addUserToGroup', function () {
    const validGroup = 'admin-group';
    const invalidGroup = 'clown-group';

    it('should fail with 404 when user does not exist', async () => {
      await withRecording(__dirname, 'addUserToGroup user not found', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(() => adapter.addUserToGroup('invalid', validGroup)).rejects.toThrowError(
          new UserNotFoundError(),
        );
      });
    });

    it('should fail with 404 when group does not exist', async () => {
      await withRecording(__dirname, 'addUserToGroup group not found', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(() =>
          adapter.addUserToGroup('0d92b533-0cc1-4b0f-9e74-139d43e20c1c', invalidGroup),
        ).rejects.toThrowError(new ResourceNotFoundError());
      });
    });

    it('should fail when invalid type of userId passed', async () => {
      await withRecording(__dirname, 'addUserToGroup with no userId', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(adapter.addUserToGroup()).rejects.toThrowErrorMatchingInlineSnapshot(
          `"InvalidParameterException : 2 validation errors detected: Value null at 'groupName' failed to satisfy constraint: Member must not be null; Value at 'username' failed to satisfy constraint: Member must not be null"`,
        );
      });
    });

    it('should fail when invalid type of group passed', async () => {
      await withRecording(__dirname, 'addUserToGroup with no groupName', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          adapter.addUserToGroup('0d92b533-0cc1-4b0f-9e74-139d43e20c1c'),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"InvalidParameterException : 1 validation error detected: Value null at 'groupName' failed to satisfy constraint: Member must not be null"`,
        );
      });
    });

    it('should resolve when ok', async () => {
      await withRecording(__dirname, 'addUserToGroup success', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(
          adapter.addUserToGroup('0d92b533-0cc1-4b0f-9e74-139d43e20c1c', validGroup),
        ).toResolve();
      });
    });
  });

  describe('removeUserFromGroup', function () {
    const validGroup = 'admin-group';
    const invalidGroup = 'clown-group';

    it('should fail with 404 when user does not exist', async () => {
      await withRecording(__dirname, 'removeUserFromGroup user not found', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(() => adapter.removeUserFromGroup('invalid', validGroup)).rejects.toThrowError(
          new UserNotFoundError(),
        );
      });
    });

    it('should fail with 404 when group does not exist', async () => {
      await withRecording(__dirname, 'removeUserFromGroup group not found', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(() =>
          adapter.removeUserFromGroup('0d92b533-0cc1-4b0f-9e74-139d43e20c1c', invalidGroup),
        ).rejects.toThrowError(new ResourceNotFoundError());
      });
    });

    it('should fail when invalid type of userId passed', async () => {
      await withRecording(__dirname, 'removeUserFromGroup with no userId', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(adapter.removeUserFromGroup()).rejects.toThrowErrorMatchingInlineSnapshot(
          `"InvalidParameterException : 2 validation errors detected: Value null at 'groupName' failed to satisfy constraint: Member must not be null; Value at 'username' failed to satisfy constraint: Member must not be null"`,
        );
      });
    });

    it('should fail when invalid type of group passed', async () => {
      await withRecording(__dirname, 'removeUserFromGroup with no groupName', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          adapter.removeUserFromGroup('0d92b533-0cc1-4b0f-9e74-139d43e20c1c'),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"InvalidParameterException : 1 validation error detected: Value null at 'groupName' failed to satisfy constraint: Member must not be null"`,
        );
      });
    });

    it('should resolve when ok', async () => {
      await withRecording(__dirname, 'removeUserFromGroup success', async () => {
        // Given
        const adapter = appRunner.getApp().get<CognitoAdapter>(CognitoAdapter);

        // When & Then
        await expect(
          adapter.removeUserFromGroup('0d92b533-0cc1-4b0f-9e74-139d43e20c1c', validGroup),
        ).toResolve();
      });
    });
  });
});

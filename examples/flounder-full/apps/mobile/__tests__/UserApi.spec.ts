import { UserApi } from '../src/services/user';
import { exampleUserEmailUsedInSession } from '@flounder/contracts';

describe('User API tests', () => {
  test('get current user correctly', async () => {
    // Given
    const userAPI = new UserApi();

    // When
    const user = await userAPI.getCurrentUser();

    // Then
    expect(user.email).toBe(exampleUserEmailUsedInSession);
  });

  test('get users correctly', async () => {
    // Given
    const userAPI = new UserApi();

    // When
    const users = await userAPI.getUsers();

    // Then
    expect(users).toHaveLength(1);
  });

  test('sing in user correctly', async () => {
    // Given
    const userAPI = new UserApi();

    // When
    const user = await userAPI.signInUser();

    // Then
    expect(user.email).toBe(exampleUserEmailUsedInSession);
  });
});

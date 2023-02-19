import React from 'react';
import { act, render, screen } from '@testing-library/react-native';
import { AppProviderMock } from '../__tests-support__/mocks';
import { UserStateUtils } from '../__tests-support__';
import { exampleUserEmailUsedInSession } from '@flounder/contracts';

describe('Home screen', () => {
  beforeEach(async () => {
    await act(async () => {
      UserStateUtils.prefillAppStateWithMockedUser();
    });
  });

  test('renders correctly', async () => {
    // When
    render(<AppProviderMock />);

    // Then
    await act(async () => {
      const user = UserStateUtils.getUserFromAppState();

      expect(user.email).toBe(exampleUserEmailUsedInSession);
    });
    expect(screen.getByTestId('logoutButtonTestID')).toBeTruthy();
    expect(screen.getByTestId('menuIconButtonTestID')).toBeTruthy();
    expect(screen.getByTestId('signedInHeaderTitleTestID')).toBeTruthy();
  });

  test('logout user correctly', async () => {
    // Given
    const userInSession = UserStateUtils.getUserFromAppState();
    expect(userInSession.email).toBe(exampleUserEmailUsedInSession);

    // When
    await act(async () => {
      UserStateUtils.removeMockedUserFromAppState();

      // Then
      const userLoggedOut = UserStateUtils.getUserFromAppState();
      expect(userLoggedOut).toBeNull();
    });

    // Then
    render(<AppProviderMock />);
    expect(screen.getByTestId('loginButtonTestID')).toBeTruthy();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { AppProviderMock } from '../__tests-support__/mocks';
import { store } from '../src/store/store';

describe('Welcome screen', () => {
  test('renders correctly', () => {
    // When
    render(<AppProviderMock />);

    // Then
    expect(screen.getByTestId('loginButtonTestID')).toBeTruthy();
    expect(screen.getByTestId('menuIconButtonTestID')).toBeTruthy();
    expect(screen.getByTestId('notSignedInHeaderTitleTestID')).toBeTruthy();
  });

  test('redux store should have default values', () => {
    // When
    render(<AppProviderMock />);

    // Then
    const state = store.getState().user;
    expect(state.user).toBeNull();
    expect(state.isFetching).toBeFalsy();
  });

  test('drawer opens and closes correctly', async () => {
    // Given
    render(<AppProviderMock />);

    const menuButton = screen.getByTestId('menuIconButtonTestID');

    // When
    fireEvent.press(menuButton);

    // Then
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Users')).toBeTruthy();
    expect(screen.getByText('Subscriptions')).toBeTruthy();
    expect(screen.getByText('Emails')).toBeTruthy();


    // Given
    const closeIconButton = screen.getByTestId('closeIconButtonTestID');

    // When
    fireEvent.press(closeIconButton);

    // Then
    expect(screen.queryByTestId('closeIconButtonTestID')).toBeNull();
  });
});

import { ScreenRoutesNames } from './interfaces';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './Routes';

export const RoutesContainer = () => {
  const linking = {
    prefixes: ['flounder://'],
    config: {
      screens: {
        [ScreenRoutesNames.Welcome]: 'welcome',
        [ScreenRoutesNames.Welcome]: 'auth/callback/cognito/login',
        [ScreenRoutesNames.Home]: 'auth/callback/cognito/logout',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Routes />
    </NavigationContainer>
  );
};

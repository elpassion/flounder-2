import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../../src/store/store';
import Routes from '../../src/routes/Routes';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from '../../src/context';

export const AppProviderMock = () => {
  return (
    <PaperProvider>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ReduxProvider>
    </PaperProvider>
  );
};

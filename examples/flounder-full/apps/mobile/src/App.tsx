import React from 'react';
import { RoutesContainer } from './routes/RoutesContainer';
import { PaperProvider, StoreProvider } from './context';

export const App = () => {
  return (
    <StoreProvider>
      <PaperProvider>
        <RoutesContainer />
      </PaperProvider>
    </StoreProvider>
  );
};

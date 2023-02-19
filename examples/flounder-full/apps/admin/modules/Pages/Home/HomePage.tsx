import React, { FC } from 'react';
import { LayoutWrapper } from '@pankod/refine-core';
import { useAuth } from '@flounder/cognito-auth';

export const HomePage: FC = () => {
  const { currentUser } = useAuth();

  return (
    <LayoutWrapper>
      <h1>🐟 Dashboard 🐟</h1>
      <p>User email: {currentUser?.email}</p>
    </LayoutWrapper>
  );
};

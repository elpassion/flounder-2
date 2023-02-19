import React from 'react';
import type { NextPage } from 'next';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import { common } from 'lang/messages/common';
import { CustomSignInForm } from '../../CustomAuth/CustomSignInForm';
import { messages } from './messages';

export const CustomSignIn: NextPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="pt-3 flex flex-col items-center">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">
        {currentUser ? (
          <FormattedMessage {...common.alreadySignIn} />
        ) : (
          <FormattedMessage {...messages.signIn} />
        )}
      </h2>
      {!currentUser && <CustomSignInForm />}
    </div>
  );
};

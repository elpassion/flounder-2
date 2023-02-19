import React, { useState } from 'react';
import type { NextPage } from 'next';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import { common } from 'lang/messages/common';
import { ConfirmSignUpForm } from '../../CustomAuth/ConfirmSignUpForm';
import { CustomSignUpForm } from '../../CustomAuth/CustomSignUpForm';
import { messages } from './messages';

export const CustomSignUp: NextPage = () => {
  const [notConfirmedUserEmail, setNotConfirmedUserEmail] = useState<string>();
  const { currentUser } = useAuth();

  if (currentUser)
    return (
      <div className="text-lg sm:text-xl flex font-semibold flex-col items-center">
        <FormattedMessage {...common.alreadySignIn} />
      </div>
    );

  return (
    <div className="pt-3 flex flex-col items-center">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">
        <FormattedMessage {...messages.signUp} />
      </h2>
      {notConfirmedUserEmail ? (
        <ConfirmSignUpForm email={notConfirmedUserEmail} />
      ) : (
        <CustomSignUpForm onSignedUp={setNotConfirmedUserEmail} />
      )}
    </div>
  );
};

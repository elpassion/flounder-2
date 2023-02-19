import React from 'react';
import { NextPage } from 'next';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import { common } from 'lang/messages/common';
import { EditUserPasswordForm } from '../../UserProfile/EditUserPasswordForm';

export const UserChangePassword: NextPage = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <div className="pt-3">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">
        <FormattedMessage {...common.changePassword} />
      </h2>
      <EditUserPasswordForm />
    </div>
  ) : null;
};

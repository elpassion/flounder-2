import React from 'react';
import { NextPage } from 'next';
import { FormattedMessage } from 'react-intl';
import { UserProfile } from '../../UserProfile';
import { messages } from './messages';

export const UserProfilePage: NextPage = () => {
  return (
    <div className="pt-3">
      <FormattedMessage {...messages.header} />
      <UserProfile />
    </div>
  );
};

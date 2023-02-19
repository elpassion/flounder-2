import React from 'react';
import type { NextPage } from 'next';
import { FormattedMessage } from 'react-intl';
import { NewsletterForm } from '../../Newsletter/NewsletterForm';
import { messages } from './messages';

export const Subscriptions: NextPage = () => {
  return (
    <div className="pt-3">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">
        <FormattedMessage {...messages.header} />
      </h2>
      <NewsletterForm />
    </div>
  );
};

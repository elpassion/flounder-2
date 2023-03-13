import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';

export const HomePage: NextPage = () => {
  const router = useRouter();
  const { success, cancelled } = router.query;

  const definePageMessage = () => {
    if (success) {
      return messages.paymentSuccess;
    } else if (cancelled) {
      return messages.paymentCancelled;
    } else return messages.homePageHeader;
  };

  return (
    <>
      <h1 className="text-xl font-bold leading-5 sm:text-2xl">
        <FormattedMessage {...definePageMessage()} />
      </h1>
    </>
  );
};

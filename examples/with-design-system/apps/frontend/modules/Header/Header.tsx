import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'elp-taco-ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import { deleteAllCookies } from '@flounder/next-utils';
import { Avatar as SmallAvatar } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { HeaderSection } from 'modules/Header/HeaderSection';
import { Notification } from 'modules/Notification';
import { routes } from 'utils/routes';
import { LangSwitch } from './LangSwitch';
import { messages } from './messages';

interface IHeaderProps {
  custom?: boolean;
}

export const Header: NextPage = () => {
  const { currentUser } = useAuth();

  return (
    <header className="w-full flex items-center justify-between px-5">
      {currentUser ? <HeaderWithSession /> : <HeaderWithoutSession custom />}
    </header>
  );
};

const HeaderWithoutSession = ({ custom }: IHeaderProps) => {
  const { cognitoApi } = useAuth();
  const intl = useIntl();

  return (
    <>
      <div>
        <FormattedMessage {...messages.notSignedIn} />
      </div>
      <div className="flex justify-end items-center gap-4">
        {custom ? (
          <Link href={routes.login}>
            <Button size="sm" text={intl.formatMessage(common.signIn)} variant="primary" />
          </Link>
        ) : (
          <Button
            size="sm"
            text={intl.formatMessage(common.signIn)}
            variant="primary"
            onClick={() => {
              cognitoApi?.federatedSignIn();
            }}
          />
        )}
        <LangSwitch />
      </div>
    </>
  );
};

const HeaderWithSession = () => {
  const { currentUser, cognitoApi } = useAuth();
  const router = useRouter();
  const intl = useIntl();
  if (!currentUser) return null;
  const { email, avatar_url } = currentUser;

  const signOut = () => {
    deleteAllCookies();
    cognitoApi
      ?.signOut()
      .then(() => {
        localStorage.clear();
        router.push(routes.home);
      })
      .catch(() => console.error('Sth goes wrong during logout'));
  };

  return (
    <>
      <HeaderSection>
        <div>
          <SmallAvatar size="small" src={avatar_url || ''} />
        </div>
        <FormattedMessage {...messages.signedInAs} values={{ email }} />
      </HeaderSection>

      <HeaderSection>
        <Notification />
        <Button
          size="sm"
          text={intl.formatMessage(messages.signOut)}
          variant="ghost"
          onClick={signOut}
        />
        <LangSwitch />
      </HeaderSection>
    </>
  );
};

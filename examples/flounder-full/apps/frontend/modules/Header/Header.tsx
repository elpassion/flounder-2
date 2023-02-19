import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import { deleteAllCookies } from '@flounder/next-utils';
import { Avatar as SmallAvatar, Button } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { HeaderSection } from 'modules/Header/HeaderSection';
import { Notification } from 'modules/Notification';
import { messages } from './messages';

interface HeaderProps {
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

const HeaderWithoutSession = ({ custom }: HeaderProps) => {
  const { cognitoApi } = useAuth();
  return (
    <>
      <div>
        <FormattedMessage {...messages.notSignedIn} />
      </div>
      {custom ? (
        <Link href={'/customauth/customsignin'}>
          <Button>
            <FormattedMessage {...common.signIn} />
          </Button>
        </Link>
      ) : (
        <Button
          onClick={() => {
            cognitoApi?.federatedSignIn();
          }}
        >
          <FormattedMessage {...common.signIn} />
        </Button>
      )}
    </>
  );
};

const HeaderWithSession = () => {
  const { currentUser, cognitoApi } = useAuth();
  const router = useRouter();
  if (!currentUser) return null;
  const { email, avatar_url } = currentUser;

  const signOut = () => {
    deleteAllCookies();
    cognitoApi
      ?.signOut()
      .then(() => {
        localStorage.clear();
        router.push('/');
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
        <Button onClick={signOut}>
          <FormattedMessage {...messages.signOut} />
        </Button>
      </HeaderSection>
    </>
  );
};

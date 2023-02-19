import React from 'react';
import {
  AtSymbolIcon,
  HomeIcon,
  MailIcon,
  UsersIcon,
  CreditCardIcon,
} from '@heroicons/react/outline';
import { FormattedMessage } from 'react-intl';
import { Navigation } from '@flounder/ui';
import { NavigationLink } from './NavigationLink';
import { messages } from './messages';

export function AppNavigation() {
  return (
    <Navigation>
      <NavigationLink icon={<HomeIcon />} href="/">
        <FormattedMessage {...messages.home} />
      </NavigationLink>
      <NavigationLink icon={<UsersIcon />} href="/users">
        <FormattedMessage {...messages.users} />
      </NavigationLink>
      <NavigationLink icon={<MailIcon />} href="/subscriptions">
        <FormattedMessage {...messages.subscriptions} />
      </NavigationLink>
      <NavigationLink icon={<AtSymbolIcon />} href="/emails">
        <FormattedMessage {...messages.emails} />
      </NavigationLink>
      <NavigationLink icon={<CreditCardIcon />} href="/payment">
        <FormattedMessage {...messages.payment} />
      </NavigationLink>
    </Navigation>
  );
}

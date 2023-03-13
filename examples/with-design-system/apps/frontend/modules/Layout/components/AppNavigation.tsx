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
import { routes } from 'utils/routes';
import { NavigationLink } from './NavigationLink';
import { messages } from './messages';

export function AppNavigation() {
  return (
    <Navigation>
      <NavigationLink icon={<HomeIcon />} href={routes.home}>
        <FormattedMessage {...messages.home} />
      </NavigationLink>
      <NavigationLink icon={<UsersIcon />} href={routes.users}>
        <FormattedMessage {...messages.users} />
      </NavigationLink>
      <NavigationLink icon={<MailIcon />} href={routes.subscriptions}>
        <FormattedMessage {...messages.subscriptions} />
      </NavigationLink>
      <NavigationLink icon={<AtSymbolIcon />} href={routes.emails}>
        <FormattedMessage {...messages.emails} />
      </NavigationLink>
    </Navigation>
  );
}

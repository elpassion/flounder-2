import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  signOut: {
    id: 'header.signOut',
    defaultMessage: 'Sign out',
  },
  notSignedIn: {
    id: 'header.notSignedIn',
    defaultMessage: 'Not signed in 💀',
  },
  signedInAs: {
    id: 'header.signedInAs',
    defaultMessage: 'Signed in as {email}',
  },
});

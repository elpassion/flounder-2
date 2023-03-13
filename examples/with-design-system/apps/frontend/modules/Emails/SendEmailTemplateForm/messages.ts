import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  header: {
    id: 'emailsForm.header',
    defaultMessage: 'Users',
  },
  body: {
    id: 'emailsForm.body',
    defaultMessage: 'Body',
  },
  successMessage: {
    id: 'emailsForm.successMessage',
    defaultMessage: 'Check your recipient e-mail inbox!',
  },
  successButton: {
    id: 'emailsForm.successButton',
    defaultMessage: 'Send another e-mail',
  },
  submitButton: {
    id: 'emailsForm.submitButton',
    defaultMessage: 'Send',
  },
  toastSuccessContent: {
    id: 'emailsForm.toastSuccessContent',
    defaultMessage: 'Email successfully sent',
  },
  toastErrorContent: {
    id: 'emailsForm.toastErrorContent',
    defaultMessage: 'Sth goes wrong during sending an email. We are deeply sorry',
  },
});

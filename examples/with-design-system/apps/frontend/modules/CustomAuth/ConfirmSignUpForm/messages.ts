import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  confirmAccount: {
    id: 'customSignUp.confirmAccount',
    defaultMessage: 'Confirm Account',
  },
  codeSentSuccess: {
    id: 'customSignUp.codeSentSuccess',
    defaultMessage:
      'We have sent a code by email to {maskedEmail}. Enter it below to confirm your account.',
  },
  verificationCode: {
    id: 'customSignUp.verificationCode',
    defaultMessage: 'Verification Code',
  },
  codeSent: {
    id: 'customSignUp.codeSent',
    defaultMessage: 'Code sent! or you can again: ',
  },
  noCodeReceived: {
    id: 'customSignUp.noCodeReceived',
    defaultMessage: "Didn't receive a code? ",
  },
  sendNewCode: {
    id: 'customSignUp.sendNewCode',
    defaultMessage: 'Send a new code',
  },
});

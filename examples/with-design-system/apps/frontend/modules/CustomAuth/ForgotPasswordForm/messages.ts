import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  forgotPassword: {
    id: 'customForgotPassword.forgotPassword',
    defaultMessage: 'Forgot your password?',
  },
  resetMyPassword: {
    id: 'customForgotPassword.resetMyPassword',
    defaultMessage: 'Reset my password',
  },
  resetPasswordInstruction: {
    id: 'customForgotPassword.resetPasswordInstruction',
    defaultMessage: 'Enter your Email below and we will send a message to reset your password',
  },
  generalResetPasswordError: {
    id: 'customForgotPassword.generalResetPasswordError',
    defaultMessage: 'Error during sending reset password code',
  },
});

import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  passwordChangedTitle: {
    id: 'customForgotPassword.passwordChangedTitle',
    defaultMessage: 'Password changed',
  },
  passwordChangedDescription: {
    id: 'customForgotPassword.passwordChangedDescription',
    defaultMessage: 'Your password has been successfully changed.',
  },
  loginInstructionPreLinkPart: {
    id: 'customForgotPassword.loginInstructionPreLinkPart',
    defaultMessage: 'Now you can',
  },
  loginInstructionLinkText: {
    id: 'customForgotPassword.loginInstructionLinkText',
    defaultMessage: 'Login',
  },
  loginInstructionPostLinkPart: {
    id: 'customForgotPassword.loginInstructionPostLinkPart',
    defaultMessage: 'using your new password.',
  },
  sentPasswordInfo: {
    id: 'customForgotPassword.sentPasswordInfo',
    defaultMessage:
      'We have sent a password reset code by email to {maskedEmail}. Enter it below to reset your password.',
  },
  newPassword: {
    id: 'customForgotPassword.newPassword',
    defaultMessage: 'New Password',
  },
  repeatNewPassword: {
    id: 'customForgotPassword.repeatNewPassword',
    defaultMessage: 'Enter New Password Again',
  },
});

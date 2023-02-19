import { SignInDto } from './sign-in.dto';
import { exampleUser } from '../user';
import { ConfirmForgotPasswordDto } from './confirm-forgot-password.dto';
import { ChangePasswordDto } from '../user';

export const exampleUserSignInData: SignInDto = {
  mail: exampleUser.email,
  password: 'Password1#',
};

export const exampleUserNotConfirmedSignInData: SignInDto = {
  mail: 'emailnotconfirmed@elpassion.pl',
  password: 'Password1#',
};

export const exampleUserResetPasswordData: ConfirmForgotPasswordDto = {
  code: '222222',
  newPassword: 'Password2#',
  repeatNewPassword: 'Password2#',
};

export const exampleUserChangePassword: ChangePasswordDto = {
  oldPassword: 'Password1#',
  newPassword: 'Password2#',
  repeatNewPassword: 'Password2#',
};

export const exampleConfirmationCode = '1234567';
export const exampleExpiredCode = '333333';

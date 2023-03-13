import { TSignIn } from './sign-in.schema.type';
import { exampleUser } from '../user';
import { TConfirmPassword } from './confirm-forgot-password.dto';
import { TChangePassword } from '../user';

export const exampleUserSignInData: TSignIn = {
  mail: exampleUser.email,
  password: 'Password1#',
};

export const exampleUserNotConfirmedSignInData: TSignIn = {
  mail: 'emailnotconfirmed@elpassion.pl',
  password: 'Password1#',
};

export const exampleUserResetPasswordData: TConfirmPassword = {
  code: '222222',
  newPassword: 'Password2#',
  repeatNewPassword: 'Password2#',
};

export const exampleUserChangePassword: TChangePassword = {
  oldPassword: 'Password1#',
  newPassword: 'Password2#',
  repeatNewPassword: 'Password2#',
};

export const exampleConfirmationCode = '1234567';
export const exampleExpiredCode = '333333';

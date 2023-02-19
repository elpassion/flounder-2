import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { IConfig } from '@flounder/next-utils';
import { CognitoApi } from './CognitoApi';
import { IUser } from './CognitoApi.interface';
import {
  exampleUserSignInData,
  exampleUserNotConfirmedSignInData,
  exampleConfirmationCode,
  SignInDto,
  exampleUserResetPasswordData,
  exampleExpiredCode,
  exampleUserChangePassword,
} from '@flounder/contracts';
import { CognitoErrorCode } from '../Auth.interface';
import { Hub } from 'aws-amplify';

export class CognitoTestApi extends CognitoApi {
  private exampleUserData: SignInDto = exampleUserSignInData;
  private exampleUserNotConfirmed: SignInDto =
    exampleUserNotConfirmedSignInData;

  constructor(authInstance: typeof Auth = Auth, env: IConfig) {
    super(authInstance, env);
  }

  private isCorrectCode = (code: string) => code === exampleConfirmationCode;
  private isUserExisted = (email: string) =>
    email === this.exampleUserData.mail;
  private isUserNotConfirmed = (email: string) =>
    email === this.exampleUserNotConfirmed.mail;
  private isExistedUserValidPassword = (password: string) =>
    password === this.exampleUserData.password;

  // consult: https://stackoverflow.com/questions/51649891/how-to-mock-aws-library-in-jest
  signIn = jest.fn((email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      const userExists = this.isUserExisted(email);
      const userNotConfirmed = this.isUserNotConfirmed(email);
      const isCorrectPassword = this.isExistedUserValidPassword(password);

      if (userNotConfirmed) {
        return reject({
          code: CognitoErrorCode.UserNotConfirmedException,
          message: 'User is not confirmed',
        });
      }

      if (userExists && isCorrectPassword) {
        // for warning in test about 'auth is protected' https://github.com/aws-amplify/amplify-js/issues/10119
        Hub.dispatch('auth', { event: 'signIn', message: '', data: null });
        return resolve();
      }

      return reject({
        code: CognitoErrorCode.NotAuthorizedException,
        message: 'Invalid credentials.',
      });
    });
  });

  signOut = jest
    .fn<Promise<void>, unknown[]>()
    .mockRejectedValue('This method is not mocked!');

  confirmUser = jest.fn((_, code: string) => {
    return new Promise<void>((resolve, reject) => {
      if (this.isCorrectCode(code)) {
        return resolve();
      }

      return reject({
        code: CognitoErrorCode.CodeMismatchException,
        message: 'Wrong verification code',
      });
    });
  });

  resendConfirmationCode = jest.fn(() => {
    return new Promise<void>((resolve) => {
      return resolve();
    });
  });

  getCurrentAuthenticatedUser = jest
    .fn<Promise<IUser>, unknown[]>()
    .mockRejectedValue('This method is not mocked!');

  getUserJwtToken = jest
    .fn<Promise<string>, unknown[]>()
    .mockRejectedValue('This method is not mocked!');

  forgotPassword = jest.fn(() => {
    return new Promise<void>((resolve) => {
      return resolve();
    });
  });

  forgotPasswordSubmit = jest.fn((password: string, code: string) => {
    return new Promise<string>((resolve, reject) => {
      const isCodeValid = code === exampleUserResetPasswordData.code;
      const isCodeExpired = code === exampleExpiredCode;
      const isPasswordValid =
        password === exampleUserResetPasswordData.newPassword;

      if (isCodeValid && isPasswordValid) {
        return resolve('');
      }

      if (isCodeExpired) {
        return reject({
          code: CognitoErrorCode.ExpiredCodeException,
          message: 'Invalid code provided, please request a code again.',
        });
      }

      if (!isCodeValid) {
        return reject({
          code: CognitoErrorCode.CodeMismatchException,
          message: 'Invalid verification code provided, please try again.',
        });
      }

      return reject({
        message: 'Sth wrong during setting new password',
      });
    });
  });

  changePassword = jest.fn((oldPassword: string, newPassword: string) => {
    return new Promise<string>((resolve, reject) => {
      const isOldPasswordValid =
        oldPassword === exampleUserChangePassword.oldPassword;
      const isNewPasswordValid =
        newPassword === exampleUserChangePassword.newPassword;
      const isRepeatNewPasswordValid =
        newPassword === exampleUserChangePassword.repeatNewPassword;

      if (
        isOldPasswordValid &&
        isNewPasswordValid &&
        isRepeatNewPasswordValid
      ) {
        return resolve('SUCCESS');
      }

      if (!isOldPasswordValid) {
        return reject({
          code: CognitoErrorCode.InvalidPasswordException,
          message: 'Incorrect old password',
        });
      }

      if (!isNewPasswordValid) {
        return reject({
          code: CognitoErrorCode.InvalidPasswordException,
          message: 'Invalid new password',
        });
      }

      if (!isRepeatNewPasswordValid) {
        return reject({
          code: CognitoErrorCode.InvalidPasswordException,
          message: 'Invalid repeat new password',
        });
      }

      return reject({
        message: 'Sth wrong during changing password',
      });
    });
  });

  getCurrentAuthenticatedRawCognitoUser = jest
    .fn<Promise<CognitoUser>, unknown[]>()
    .mockRejectedValue('This method is not mocked!');

  federatedSignIn = jest
    .fn<Promise<void>, unknown[]>()
    .mockRejectedValue('This method is not mocked!');

  configureAmplify = jest.fn<void, unknown[]>();
}

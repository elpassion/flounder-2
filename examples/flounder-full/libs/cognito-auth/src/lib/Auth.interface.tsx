import { ExtendedUserDto } from '@flounder/contracts';
import { CognitoApi } from './CognitoApi/CognitoApi';

export enum CognitoErrorCode {
  NotAuthorizedException = 'NotAuthorizedException',
  UserNotConfirmedException = 'UserNotConfirmedException',
  CodeMismatchException = 'CodeMismatchException',
  ExpiredCodeException = 'ExpiredCodeException',
  InvalidPasswordException = 'InvalidPasswordException',
  InvalidParameterException = 'InvalidParameterException',
  LimitExceededException = 'LimitExceededException',
}

export enum CognitoContext {
  ResetPassword = 'ResetPassword',
}

export enum CognitoAppErrorMessages {
  UserNotConfirmed = 'User account not confirmed. Check your mail',
  General = 'Something goes wrong',
  InvalidUserOrPassword = 'Invalid credentials',
  CodeMismatchException = 'Wrong verification code',
  ExpiredCodeException = 'Code expired. Resend new code',
}

export interface IUserNotConfirmedError extends CognitoError {
  email: string;
}

export class UserNotConfirmedError implements IUserNotConfirmedError {
  constructor(
    public code: CognitoErrorCode,
    public message: string,
    public email: string
  ) {}
}

export interface CognitoError {
  code: CognitoErrorCode;
  message: string;
}

export interface AuthProviderProps {
  cognitoApi: CognitoApi;
  ssrUser: ExtendedUserDto | null;
}

export type IAuthContext = {
  cognitoApi?: CognitoApi;
  currentUser: ExtendedUserDto | null;
  setCurrentAuthenticatedUser: () => Promise<void>;
};

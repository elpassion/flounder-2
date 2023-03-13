import { TExtendedUser } from '@flounder/contracts';

export type ICognitoApi = {
  signIn(email: string, password: string): Promise<void>;

  confirmUser(email: string, code: string): Promise<void>;

  resendConfirmationCode(email: string): Promise<void>;

  signOut(): Promise<void>;

  getCurrentAuthenticatedUser(): Promise<IUser>;

  getUserJwtToken(): Promise<string>;

  changePassword(oldPassword: string, newPassword: string): Promise<string>;

  forgotPassword(email: string): Promise<unknown>;

  forgotPasswordSubmit(
    email: string,
    password: string,
    code: string
  ): Promise<string>;
};

export interface IUser {
  idToken: string;
  data: IUserData;
  me: TExtendedUser;
}

export type IUserData =
  | {
      [key: string]: unknown;
      email?: string;
      email_verified?: boolean;
      picture?: string;
      ['cognito:username']?: string;
    }
  | undefined;

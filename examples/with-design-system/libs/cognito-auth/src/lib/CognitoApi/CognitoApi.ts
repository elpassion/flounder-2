import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { IAuthConfig } from '@flounder/next-utils';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

export class CognitoApi {
  constructor(
    private readonly authInstance: typeof Auth = Auth,
    private readonly env: IAuthConfig
  ) {
    CognitoApi.configureAmplify(env);
  }

  static configureAmplify(env: IAuthConfig) {
    const {
      cognitoRegion,
      cognitoUserPoolId,
      cognitoUserPoolWebClientId,
      cognitoOAuthDomain,
      cognitoOAuthRedirectSignIn,
      cognitoOAuthRedirectSignOut,
    } = env;

    Amplify.configure({
      Auth: {
        region: cognitoRegion,
        userPoolId: cognitoUserPoolId,
        userPoolWebClientId: cognitoUserPoolWebClientId,
      },
      oauth: {
        domain: cognitoOAuthDomain,
        redirectSignIn: cognitoOAuthRedirectSignIn,
        redirectSignOut: cognitoOAuthRedirectSignOut,
        responseType: 'code',
      },
      ssr: true,
    });
  }

  // TODO: check return type:
  // https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signin
  async signIn(email: string, password: string): Promise<void> {
    return this.authInstance.signIn(email, password);
  }

  async federatedSignIn(provider?: {
    provider: CognitoHostedUIIdentityProvider;
  }): Promise<void> {
    await this.authInstance.federatedSignIn(provider);
  }

  async signInWithFacebook() {
    await this.authInstance.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook,
    });
  }
  async signInWithGoogle() {
    await this.authInstance.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  }

  async confirmUser(email: string, code: string): Promise<void> {
    return this.authInstance.confirmSignUp(email, code);
  }

  async resendConfirmationCode(email: string): Promise<void> {
    return this.authInstance.resendSignUp(email);
  }

  async signOut(): Promise<void> {
    await this.authInstance.signOut();
  }

  forgotPassword(email: string): Promise<unknown> {
    return this.authInstance.forgotPassword(email);
  }

  forgotPasswordSubmit(
    email: string,
    password: string,
    code: string
  ): Promise<string> {
    return this.authInstance.forgotPasswordSubmit(email, code, password);
  }

  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<string> {
    const user = await this.getCurrentAuthenticatedRawCognitoUser();
    return this.authInstance.changePassword(user, oldPassword, newPassword);
  }

  protected getCurrentAuthenticatedRawCognitoUser(
    bypassCache = false
  ): Promise<CognitoUser> {
    return this.authInstance.currentAuthenticatedUser({ bypassCache });
  }
}

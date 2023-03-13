export class AppConfig {
  get cognitoConfig() {
    return {
      cognitoRegion: this.getOrThrow('COGNITO_REGION'),
      cognitoUserPoolId: this.getOrThrow('COGNITO_USER_POOL_ID'),
      cognitoUserPoolWebClientId: this.getOrThrow('COGNITO_USER_POOL_WEB_CLIENT_ID'),
      cognitoOAuthDomain: this.getOrThrow('COGNITO_OAUTH_DOMAIN'),
      cognitoOAuthRedirectSignIn: this.getOrThrow('COGNITO_OAUTH_REDIRECT_SIGNIN'),
      cognitoOAuthRedirectSignOut: this.getOrThrow('COGNITO_OAUTH_REDIRECT_SIGNOUT'),
    };
  }

  get config() {
    return {
      cognitoConfig: this.cognitoConfig,
    };
  }

  private getOrThrow(key: string) {
    const env = process.env[key];
    if (!env) throw new Error(`Env ${key} not found.`);
    return env;
  }
}

import { AppDispatch } from '../../store/store';
import { UserService } from '../user';
import { AuthConfiguration, authorize, refresh } from 'react-native-app-auth';
import {
  resetTokensStorage,
  retrieveTokensFromStorage,
  saveTokensToStorage,
  TokenStorage,
} from '../storage.service';
import env from '../../utils/env';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { clearAuthenticatedUser } from '../../reducers/user.reducer';

export class AuthService {
  private readonly cognitoConfig: AuthConfiguration = {
    issuer: env.COGNITO_ISSUER,
    clientId: env.COGNITO_CLIENT_ID,
    clientAuthMethod: 'post',
    redirectUrl: env.COGNITO_LOGIN_REDIRECT,
    scopes: ['profile', 'email', 'openid'],
    serviceConfiguration: {
      authorizationEndpoint: env.COGNITO_URL + '/oauth2/authorize',
      tokenEndpoint: env.COGNITO_URL + '/oauth2/token',
      revocationEndpoint: env.COGNITO_URL + '/oauth2/revoke',
      endSessionEndpoint: env.COGNITO_URL + '/logout',
    },
    additionalParameters: {
      prompt: 'login',
    },
    iosPrefersEphemeralSession: true,
  };
  private userService: UserService = null;

  constructor() {
    this.userService = new UserService();
  }

  authorizeUser(): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
      const newAuthState = await authorize({
        ...this.cognitoConfig,
        connectionTimeoutSeconds: 5,
      });
      await saveTokensToStorage(
        newAuthState.idToken,
        newAuthState.refreshToken
      );
      dispatch(this.userService.signIn());
    };
  }

  logoutUser(): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
      try {
        const endSessionEndpoint = env.COGNITO_URL + '/logout';
        const cb = encodeURIComponent(env.COGNITO_LOGOUT_REDIRECT);
        const url = `${endSessionEndpoint}?client_id=${env.COGNITO_CLIENT_ID}&logout_uri=${cb}`;
        await InAppBrowser.openAuth(url, env.COGNITO_LOGOUT_REDIRECT, {
          ephemeralWebSession: true,
          showTitle: false,
          enableUrlBarHiding: false,
          enableDefaultShare: false,
        });

        await resetTokensStorage();
        dispatch(clearAuthenticatedUser());
      } catch (e) {
        console.log(e);
      }
    };
  }

  async refreshUserTokens(): Promise<TokenStorage> {
    const tokens: TokenStorage = await retrieveTokensFromStorage();

    const newAuthState = await refresh(this.cognitoConfig, {
      refreshToken: tokens.refreshToken,
    });

    await saveTokensToStorage(newAuthState.idToken, tokens.refreshToken);
    const refreshedToken: TokenStorage = {
      accessToken: newAuthState.idToken,
      refreshToken: tokens.refreshToken,
    };
    return refreshedToken;
  }
}

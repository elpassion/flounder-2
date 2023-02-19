import { AxiosRequestConfig } from 'axios';
import env  from '../utils/env';
import { retrieveTokensFromStorage, TokenStorage } from './storage.service';
import { JwtUtil } from '../utils';
import { AuthService } from './auth';
import { store } from '../store/store';
import { HttpClient } from '@flounder/http-client';

export class MobileHttpClientWithSession extends HttpClient {
  constructor() {
    super({
      url: env.API_URL,
      useRequestConfig: (config) => this.addSessionConfigToRequest(config),
    });
  }

  private async addSessionConfigToRequest(requestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    try {
      const tokens: TokenStorage = await retrieveTokensFromStorage();
      if (tokens) {
        const jwtUtil = new JwtUtil();
        if (tokens.accessToken) {
          if (!jwtUtil.isTokenExpired(tokens.accessToken)) {
            const newConfig: AxiosRequestConfig = {
              ...requestConfig,
              headers: {
                ...requestConfig.headers,
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            };
            return Promise.resolve(newConfig);
          }

          if (tokens.refreshToken) {
            const authService = new AuthService();
            const refreshedTokens = await authService.refreshUserTokens();
            const newConfig: AxiosRequestConfig = {
              ...requestConfig,
              headers: {
                ...requestConfig.headers,
                Authorization: `Bearer ${refreshedTokens.accessToken}`,
              },
            };
            return Promise.resolve(newConfig);
          }
        }
      }
    } catch (e) {
      this.clearAuthenticatedUser();
    }
  }

  private clearAuthenticatedUser(): void {
    const { dispatch } = store;
    const authService = new AuthService();
    dispatch(authService.logoutUser());
  }
}

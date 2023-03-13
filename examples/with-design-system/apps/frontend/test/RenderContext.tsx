import React from 'react';
import Auth from '@aws-amplify/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { AuthProvider, CognitoTestApi } from '@flounder/cognito-auth';
import { TExtendedUser } from '@flounder/contracts';
import { AuthConfigProvider } from '@flounder/next-utils';
import { NotificationWebSocketContext } from 'modules/Notification';
import { mockRouter, routePushMock } from 'setupTests';
import { server } from './mocks';
import { testEnvValues } from './mocks/envVars';

export class RenderContext {
  public readonly queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      // eslint-disable-next-line  @typescript-eslint/no-empty-function
      error() {},
      log: console.log,
      warn: console.warn,
    },
  });

  public readonly server = server;

  setRoute(route: string) {
    mockRouter.mockReturnValue({ route, push: routePushMock });
  }

  private authenticatedAs: {
    user: TExtendedUser;
    expires: string;
  } | null = null;

  setAuthenticatedAs(user: TExtendedUser) {
    this.authenticatedAs = { user, expires: '1' };
  }

  render(children: JSX.Element) {
    return render(
      <QueryClientProvider client={this.queryClient}>
        <AuthConfigProvider config={testEnvValues}>
          <AuthProvider
            cognitoApi={new CognitoTestApi(Auth, { ...testEnvValues })}
            ssrUser={this.authenticatedAs?.user || null}
          >
            <IntlProvider
              locale="en"
              onError={err => {
                if (err.code === 'MISSING_TRANSLATION') {
                  // ignore in tests
                  return;
                }
                throw err;
              }}
            >
              <NotificationWebSocketContext.Provider
                value={{
                  connect: () => ({}),
                  disconnect: () => ({}),
                  onNotification: () => ({}),
                  isConnected: () => {
                    return true;
                  },
                }}
              >
                {children}
              </NotificationWebSocketContext.Provider>
            </IntlProvider>
          </AuthProvider>
        </AuthConfigProvider>
      </QueryClientProvider>,
    );
  }
}

import { useMemo, useState } from 'react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth } from 'aws-amplify';
import { IntlProvider } from 'react-intl';
import { AuthProvider, CognitoApi } from '@flounder/cognito-auth';
import { ExtendedUserDto } from '@flounder/contracts';
import { LoggerProvider } from '@flounder/next-utils';
import { ConfigProvider, IConfig } from '@flounder/next-utils';
import { defaultLocale } from 'config';
import English from 'lang/compiled/en.json';
import Polish from 'lang/compiled/pl.json';
import Layout from 'modules/Layout/components/Layout';
import { Toaster } from 'modules/Toast';
import 'styles/globals.css';

// For testing Cognito Errors
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

type CustomAppProps = {
  config: IConfig;
} & AppProps<{ currentUser?: ExtendedUserDto; dehydratedState?: unknown }>;

const MyApp = ({ Component, pageProps, router, config }: CustomAppProps) => {
  const currentUser = pageProps?.currentUser || null;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error: any) => {
              if (error?.response.status == 502 && failureCount > 3) return false;
              if (error?.response.status >= 400) return false;
              return true;
            },
          },
        },
      }),
  );

  const locale = router.locale;

  const [shortLocale] = locale ? locale.split('-') : [defaultLocale];

  const messages = useMemo(() => {
    switch (shortLocale) {
      case 'pl':
        return Polish;
      case 'en':
        return English;
      default:
        return English;
    }
  }, [shortLocale]);

  return (
    <>
      <Head>
        <title>Flounder App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/fish.ico" />
      </Head>

      <ConfigProvider config={config}>
        <LoggerProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider ssrUser={currentUser} cognitoApi={new CognitoApi(Auth, { ...config })}>
              <Hydrate state={pageProps.dehydratedState}>
                <IntlProvider messages={messages} locale={shortLocale}>
                  <Layout>
                    {Toaster}
                    <Component {...pageProps} />
                  </Layout>
                </IntlProvider>
              </Hydrate>
            </AuthProvider>
          </QueryClientProvider>
        </LoggerProvider>
      </ConfigProvider>
    </>
  );
};

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);

  const config: IConfig = {
    pageUrl: getOrThrow('PAGE_URL'),
    cognitoRegion: getOrThrow('COGNITO_REGION'),
    cognitoUserPoolId: getOrThrow('COGNITO_USER_POOL_ID'),
    cognitoUserPoolWebClientId: getOrThrow('COGNITO_USER_POOL_WEB_CLIENT_ID'),
    cognitoOAuthDomain: getOrThrow('COGNITO_OAUTH_DOMAIN'),
    cognitoOAuthRedirectSignIn: getOrThrow('COGNITO_OAUTH_REDIRECT_SIGNIN'),
    cognitoOAuthRedirectSignOut: getOrThrow('COGNITO_OAUTH_REDIRECT_SIGNOUT'),
  };

  // We need configure Amplify first time at the top of app - before
  // withSession and Providers
  CognitoApi.configureAmplify(config);
  return { ...appProps, config };
};

function getOrThrow(key: string) {
  const env = process.env[key];
  if (!env) throw new Error(`Env ${key} not found.`);
  return env;
}

export default MyApp;

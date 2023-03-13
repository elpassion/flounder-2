import { useMemo, useState } from 'react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth } from 'aws-amplify';
import { IntlProvider } from 'react-intl';
import { AuthProvider, CognitoApi } from '@flounder/cognito-auth';
import { TExtendedUser } from '@flounder/contracts';
import { LoggerProvider } from '@flounder/next-utils';
import { defaultLocale } from 'config';
import English from 'lang/compiled/en.json';
import Polish from 'lang/compiled/pl.json';
import { AppConfig } from 'modules/AppConfig/AppConfig';
import { AppConfigProvider } from 'modules/AppConfig/AppConfigProvider';
import Layout from 'modules/Layout/components/Layout';
import { Toaster } from 'modules/Toast';
import 'styles/globals.css';

type CustomAppProps = {
  config: AppConfig;
} & AppProps<{ currentUser?: TExtendedUser; dehydratedState?: unknown }>;

const MyApp = ({ Component, pageProps, router, config }: CustomAppProps) => {
  const currentUser = pageProps?.currentUser || null;

  const { cognitoConfig } = config;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      <AppConfigProvider config={config}>
        <LoggerProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider
              ssrUser={currentUser}
              cognitoApi={new CognitoApi(Auth, { ...cognitoConfig })}
            >
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
      </AppConfigProvider>
    </>
  );
};

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);

  const appConfig = new AppConfig();
  const { config, cognitoConfig } = appConfig;

  // We need configure Amplify first time at the top of app - before
  // withSession and Providers
  CognitoApi.configureAmplify(cognitoConfig);
  return { ...appProps, config };
};

export default MyApp;
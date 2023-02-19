import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Icons, notificationProvider, Layout, ErrorComponent } from '@pankod/refine-antd';
import { Refine } from '@pankod/refine-core';
import routerProvider from '@pankod/refine-nextjs-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth } from 'aws-amplify';
import { AuthProvider, CognitoApi } from '@flounder/cognito-auth';
import { ExtendedUserDto } from '@flounder/contracts';
import { ConfigProvider, IConfig } from '@flounder/next-utils';
import HttpClientContextProvider, { useHttpClient } from '../modules/Api/HttpClient.context';
import { useAdminAuthProvider } from '../modules/authProvider';
import { adminDataProvider } from '../modules/dataProvider';
import { LoginPage } from '../modules/Pages';
import { UserList, EventList, UserEdit } from '../modules/Resources';
import { FeatureFlags } from '../modules/Resources/FeatureFlags';
import { filterRefineMenuError } from '../utils';
import '../styles/globals.css';
import '@pankod/refine-antd/dist/styles.min.css';
import 'react-quill/dist/quill.snow.css';

const { UserOutlined, MailOutlined, FlagFilled } = Icons;

const queryClient = new QueryClient();

type CustomAppProps = {
  config: IConfig;
} & AppProps<{ currentUser?: ExtendedUserDto; dehydratedState?: unknown }>;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { httpClient } = useHttpClient();
  const authProvider = useAdminAuthProvider();

  filterRefineMenuError();

  return (
    <>
      <Head>
        <title>Flounder Admin App</title>
        <meta name="description" content="Flounder Admin App" />
        <link rel="icon" href="/icons/fish.ico" />
      </Head>
      <Refine
        routerProvider={routerProvider}
        dataProvider={adminDataProvider(httpClient)}
        authProvider={authProvider}
        LoginPage={LoginPage}
        resources={[
          {
            name: 'admin/users',
            list: UserList,
            edit: UserEdit,
            icon: <UserOutlined />,
            options: {
              label: 'Users',
              route: 'users',
            },
          },
          {
            name: 'events',
            list: EventList,
            icon: <MailOutlined />,
          },
          {
            name: 'featureFlags',
            list: FeatureFlags,
            icon: <FlagFilled />,
          },
        ]}
        notificationProvider={notificationProvider}
        Layout={Layout}
        catchAll={<ErrorComponent />}
        options={{
          reactQuery: {
            clientConfig: queryClient,
          },
        }}
      >
        <Component {...pageProps} />
      </Refine>
    </>
  );
}

const StartApp = (props: CustomAppProps): JSX.Element => {
  const currentUser = props?.pageProps.currentUser || null;
  const config = props.config;

  return (
    <ConfigProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <HttpClientContextProvider>
          <AuthProvider ssrUser={currentUser} cognitoApi={new CognitoApi(Auth, { ...config })}>
            <MyApp {...props} />
          </AuthProvider>
        </HttpClientContextProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

StartApp.getInitialProps = async (ctx: AppContext) => {
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

  function getOrThrow(key: string) {
    const env = process.env[key];
    if (!env) throw new Error(`Env ${key} not found.`);
    return env;
  }
};
export default StartApp;

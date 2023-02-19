import React, { ReactNode, useContext, createContext } from 'react';

export const defaultContextValue: IConfig = {
  pageUrl: '',
  cognitoOAuthDomain: '',
  cognitoOAuthRedirectSignIn: '',
  cognitoOAuthRedirectSignOut: '',
  cognitoRegion: '',
  cognitoUserPoolId: '',
  cognitoUserPoolWebClientId: '',
};

const ConfigContext = createContext<IConfig>(defaultContextValue);

export interface IConfig {
  pageUrl: string;
  cognitoRegion: string;
  cognitoUserPoolId: string;
  cognitoUserPoolWebClientId: string;
  cognitoOAuthDomain: string;
  cognitoOAuthRedirectSignIn: string;
  cognitoOAuthRedirectSignOut: string;
}

export function ConfigProvider({
  children,
  config,
}: {
  children: ReactNode;
  config: IConfig;
}) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);

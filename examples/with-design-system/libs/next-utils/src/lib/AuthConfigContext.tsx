import { ReactNode, useContext, createContext } from 'react';

export const defaultContextValue: IAuthConfig = {
  cognitoOAuthDomain: '',
  cognitoOAuthRedirectSignIn: '',
  cognitoOAuthRedirectSignOut: '',
  cognitoRegion: '',
  cognitoUserPoolId: '',
  cognitoUserPoolWebClientId: '',
};

const AuthConfigContext = createContext<IAuthConfig>(defaultContextValue);

export interface IAuthConfig {
  cognitoRegion: string;
  cognitoUserPoolId: string;
  cognitoUserPoolWebClientId: string;
  cognitoOAuthDomain: string;
  cognitoOAuthRedirectSignIn: string;
  cognitoOAuthRedirectSignOut: string;
}

export function AuthConfigProvider({
  children,
  config,
}: {
  children: ReactNode;
  config: IAuthConfig;
}) {
  return (
    <AuthConfigContext.Provider value={config}>{children}</AuthConfigContext.Provider>
  );
}

export const useAuthConfig = () => useContext(AuthConfigContext);

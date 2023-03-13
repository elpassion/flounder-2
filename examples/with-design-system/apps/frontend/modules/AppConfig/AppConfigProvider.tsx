import { ReactNode } from 'react';
import { AuthConfigProvider } from '@flounder/next-utils';
import { AppConfig } from 'modules/AppConfig/AppConfig';

interface IAppConfigProviderProps {
  config: AppConfig;
  children: ReactNode;
}
export const AppConfigProvider = ({ config, children }: IAppConfigProviderProps) => {
  const { cognitoConfig } = config;

  return <AuthConfigProvider config={cognitoConfig}>{children}</AuthConfigProvider>;
};

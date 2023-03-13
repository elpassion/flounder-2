import * as React from 'react';
import { getByText, render } from '@testing-library/react';
import {
  AuthConfigProvider,
  IAuthConfig,
  useAuthConfig,
  defaultContextValue,
} from './AuthConfigContext';

const TestConfigComponent = () => {
  const { cognitoRegion } = useAuthConfig();
  return <div>{cognitoRegion}</div>;
};

describe(AuthConfigProvider.name, () => {
  it('should correctly return passed values', async () => {
    // Given
    const testCognitoRegion = 'eu-west';
    const { container } = new ConfigContextObject({
      ...defaultContextValue,
      cognitoRegion: testCognitoRegion,
    }).render();

    // When & Then
    expect(getByText(container, testCognitoRegion));
  });
});

class ConfigContextObject {
  public container!: HTMLElement;
  public config!: IAuthConfig;

  constructor(config: IAuthConfig) {
    this.config = config;
  }

  public render = () => {
    const renderResult = render(
      <AuthConfigProvider config={this.config}>
        <TestConfigComponent />
      </AuthConfigProvider>
    );
    this.container = renderResult.container;
    return this;
  };
}

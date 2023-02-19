import React from 'react';
import { getByText, render } from '@testing-library/react';
import {
  ConfigProvider,
  IConfig,
  useConfig,
  defaultContextValue,
} from './ConfigContext';

const TestConfigComponent = () => {
  const { pageUrl } = useConfig();
  return <div>{pageUrl}</div>;
};

describe(ConfigProvider.name, () => {
  it('should correctly return passed values', async () => {
    // Given
    const testPageUrl = 'http://www.example.com';
    const { container } = new ConfigContextObject({
      ...defaultContextValue,
      pageUrl: testPageUrl,
    }).render();

    // When & Then
    expect(getByText(container, testPageUrl));
  });
});

class ConfigContextObject {
  public container!: HTMLElement;
  public config!: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }

  public render = () => {
    const renderResult = render(
      <ConfigProvider config={this.config}>
        <TestConfigComponent />
      </ConfigProvider>
    );
    this.container = renderResult.container;
    return this;
  };
}

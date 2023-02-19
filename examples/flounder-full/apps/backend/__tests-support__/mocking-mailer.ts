import { anything, mock, reset, verify } from 'ts-mockito';

import { NestMailerAdapter } from '@flounder/mailer';

import { TestingAppRunner } from './setup-testing-app';

export const mockMailer = (appRunner: TestingAppRunner): void => {
  const NestMailerAdapterMock = mock(NestMailerAdapter);
  const resettingMock = (): void => reset(NestMailerAdapterMock);

  appRunner.mockProvider({
    mock: NestMailerAdapterMock,
    provider: NestMailerAdapter,
    resetMock: resettingMock,
  });
};

export const assertEmailWasSentOnce = (appRunner: TestingAppRunner): void => {
  const mock = appRunner.getMockedProvider(NestMailerAdapter);
  verify(mock.sendEmail(anything())).once();
};

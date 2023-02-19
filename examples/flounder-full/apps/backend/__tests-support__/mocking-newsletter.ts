import { anything, mock, reset, verify } from "ts-mockito";

import { EmailSubscriptionProducer } from "../src/modules/queue/producers/email-subscriptions.producer";
import { TestingAppRunner} from "./setup-testing-app";

export const mockNewsletter = (appRunner: TestingAppRunner): void => {
  const EmailSubscriptionProducerMock = mock(EmailSubscriptionProducer);
  const resettingMock = (): void => reset(EmailSubscriptionProducerMock);

  appRunner.mockProvider({
    mock: EmailSubscriptionProducerMock,
    provider: EmailSubscriptionProducer,
    resetMock: resettingMock
  });
};

export const assertNewsletterWasSent = (appRunner: TestingAppRunner): void => {
  const mock = appRunner.getMockedProvider(EmailSubscriptionProducer);
  verify(mock.sendNewsletter(anything())).once();
};

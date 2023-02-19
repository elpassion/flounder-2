import { anything, mock, reset, verify } from "ts-mockito";

import { TestingAppRunner } from "./setup-testing-app";
import { NotificationsProducer } from "../src/modules/queue/producers/notifications.producer";


export const mockNotifications = (appRunner: TestingAppRunner): void => {
  const NotificationsProducerMock = mock(NotificationsProducer);
  const resettingMock = (): void => reset(NotificationsProducerMock);
  appRunner.mockProvider({
    mock: NotificationsProducerMock,
    provider: NotificationsProducer,
    resetMock: resettingMock
  });
};

export const assertNotificationWasSent = (appRunner: TestingAppRunner): void => {
  const mock = appRunner.getMockedProvider(NotificationsProducer);
  verify(mock.sendNotification(anything())).once();
};

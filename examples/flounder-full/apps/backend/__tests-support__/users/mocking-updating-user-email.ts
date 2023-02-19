import { verify } from "ts-mockito";

import { TestingAppRunner } from "../setup-testing-app";
import { AuthFacade } from "../../src/auth/auth.facade";

export const assertThatUserEmailWasNotUpdate = (
  appRunner: TestingAppRunner,
  userId: string,
  email: string
): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  verify(mock.updateUserEmail(userId, email)).never();
};

import { anything, mock, reset, when } from "ts-mockito";

import { AuthFacade } from "../src/auth/auth.facade";
import { TestingAppRunner } from "./setup-testing-app";

export const mockUsersContext = (appRunner: TestingAppRunner) => {
  const AuthFacadeMock = mock(AuthFacade);

  const resettingMock = (): void => {
    reset(AuthFacadeMock);
    when(AuthFacadeMock.updateUserEmail(anything(), anything())).thenResolve();
  };

  appRunner.mockProvider({
    mock: AuthFacadeMock,
    provider: AuthFacade,
    resetMock: resettingMock
  });
}

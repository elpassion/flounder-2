import { when } from "ts-mockito";

import { TestingAppRunner } from "../setup-testing-app";
import { AuthFacade } from "../../src/auth/auth.facade";
import { CognitoClientError } from "../../src/auth/cognito/errors/cognito-client.error";

export const throwCognitoErrorWhileFetchingGroups = (appRunner: TestingAppRunner): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.getGroups()).thenThrow(new CognitoClientError('dummy error'));
}
export const stubUserGroups = (appRunner: TestingAppRunner, groups: { GroupName: string }[]): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.getGroups()).thenResolve({$metadata: {}, Groups: groups});
}

import { when } from "ts-mockito";

import { TestingAppRunner } from "../setup-testing-app";
import { AuthFacade } from "../../src/auth/auth.facade";
import { CognitoClientError } from "../../src/auth/cognito/errors/cognito-client.error";
import { UserNotFoundError } from "../../src/auth/cognito/errors/user-not-found.error";

export const throwUserNotFoundErrorWhileFetchingUser = (appRunner: TestingAppRunner, userId: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.getUserById(userId)).thenReject(new UserNotFoundError('dummy-error'));
}
export const throwCognitoErrorWhileFetchingUser = (appRunner: TestingAppRunner, userId: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.getUserById(userId)).thenReject(new CognitoClientError('dummy-error'));
}
export const stubFetchedUser = (appRunner: TestingAppRunner, userId: string, groupsNames: string[]): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.getUserById(userId)).thenResolve({
    cognitoResponse: {Username: userId, $metadata: {}},
    cognitoGroupResponse: {Groups: groupsNames.map((name) => ({GroupName: name})), $metadata: {}},
  });
}

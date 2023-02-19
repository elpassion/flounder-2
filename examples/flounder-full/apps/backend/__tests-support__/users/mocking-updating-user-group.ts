import { when } from "ts-mockito";

import { TestingAppRunner } from "../setup-testing-app";
import { AuthFacade } from "../../src/auth/auth.facade";
import { ResourceNotFoundError } from "../../src/shared/errors/resource-not-found.error";
import { UserNotFoundError } from "../../src/auth/cognito/errors/user-not-found.error";
import { CognitoClientError } from "../../src/auth/cognito/errors/cognito-client.error";

// Adding user to group.

export const throwUserNotFoundErrorWhileAddingUserToGroup = (appRunner: TestingAppRunner, userId: string, groupName: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.addUserToGroup(userId, groupName)).thenReject(new UserNotFoundError());
};

export const throwGroupNotFoundErrorWhileAddingUserToGroup = (appRunner: TestingAppRunner, userId: string, groupName: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.addUserToGroup(userId, groupName)).thenReject(new ResourceNotFoundError());
};

export const throwCognitoErrorWhileAddingUserToGroup = (appRunner: TestingAppRunner, userId: string, groupName: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.addUserToGroup(userId, groupName)).thenReject(new CognitoClientError());
};

export const mockAddingUserToGroup = (appRunner: TestingAppRunner, userId: string, groupName: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.addUserToGroup(userId, groupName)).thenResolve();
};


// Removing user from group.

export const throwUserNotFoundErrorWhileRemovingUserFromGroup = (appRunner: TestingAppRunner, userId: string, groupName: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.removeUserFromGroup(userId, groupName)).thenReject(new UserNotFoundError());
};

export const throwGroupNotFoundErrorWhileRemovingUserFromGroup = (appRunner: TestingAppRunner, userId: string, groupName: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.removeUserFromGroup(userId, groupName)).thenReject(new ResourceNotFoundError());
};

export const throwCognitoErrorWhileRemovingUserFromGroup = (appRunner: TestingAppRunner, userId: string, groupName: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.removeUserFromGroup(userId, groupName)).thenReject(new CognitoClientError());
};

export const mockRemovingUserFromGroup = (appRunner: TestingAppRunner, userId: string, groupName: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.removeUserFromGroup(userId, groupName)).thenResolve();
};

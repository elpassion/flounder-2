import { when } from "ts-mockito";

import { TestingAppRunner } from "../setup-testing-app";
import { AuthFacade } from "../../src/auth/auth.facade";
import { CognitoClientError } from "../../src/auth/cognito/errors/cognito-client.error";
import { UserNotFoundError } from "../../src/auth/cognito/errors/user-not-found.error";

export const throwUserNotFoundErrorWhileBlockingUser = (appRunner: TestingAppRunner, userId: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.blockUser(userId)).thenReject(new UserNotFoundError());
};

export const throwCognitoErrorWhileBlockingUser = (appRunner: TestingAppRunner, userId: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.blockUser(userId)).thenReject(new CognitoClientError());
};

export const mockBlockingUser = (appRunner: TestingAppRunner, userId: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.blockUser(userId)).thenResolve();
};

export const throwUserNotFoundErrorWhileUnblockingUser = (appRunner: TestingAppRunner, userId: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.unblockUser(userId)).thenReject(new UserNotFoundError());
};

export const throwCognitoErrorWhileUnblockingUser = (appRunner: TestingAppRunner, userId: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.unblockUser(userId)).thenReject(new CognitoClientError());
};

export const mockUnblockingUser = (appRunner: TestingAppRunner, userId: string): void => {
  const mock = appRunner.getMockedProvider(AuthFacade);
  when(mock.unblockUser(userId)).thenResolve();
};

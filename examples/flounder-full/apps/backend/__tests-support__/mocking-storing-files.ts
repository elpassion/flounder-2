import { randomUUID } from 'node:crypto';
import { anyString, mock, reset, verify, when } from 'ts-mockito';
import { StorageFacade, S3ClientError } from '@flounder/storage';
import { TestingAppRunner } from './setup-testing-app';

export const mockStoringFiles = (
  appRunner: TestingAppRunner,
  defaultFilesSourceURL = `https://s3.us-west-2.amazonaws.com`,
  defaultFileName = `${randomUUID()}.jpg`,
): void => {
  const FileStorageMock = mock(StorageFacade);
  const resettingMock = (): void => {
    reset(FileStorageMock);
    when(FileStorageMock.moveFileToPermStorage(anyString(), anyString())).thenCall(
      (_path: string, prefix: string) => Promise.resolve(`${prefix}/${defaultFileName}`),
    );
    when(FileStorageMock.getFileUrl(anyString())).thenCall((_: string) =>
      Promise.resolve(`${defaultFilesSourceURL}/${defaultFileName}`),
    );
  };
  appRunner.mockProvider({
    mock: FileStorageMock,
    provider: StorageFacade,
    resetMock: resettingMock,
  });
};

export const stubStoredFile = (
  appRunner: TestingAppRunner,
  avatarKey: string,
  avatarURL: string,
): void => {
  const mock = appRunner.getMockedProvider(StorageFacade);
  when(mock.getFileUrl(avatarKey)).thenResolve(avatarURL);
};

export const stubStoredFileNotFound = (appRunner: TestingAppRunner, avatarKey: string): void => {
  const mock = appRunner.getMockedProvider(StorageFacade);
  when(mock.getFileUrl(avatarKey)).thenReject(new S3ClientError('whoops'));
};

export const stubStoredFileMovedToPermStorage = (
  appRunner: TestingAppRunner,
  userId: string,
  avatarKey: string,
  avatarPath: string,
): void => {
  const mock = appRunner.getMockedProvider(StorageFacade);
  when(mock.moveFileToPermStorage(avatarKey, userId)).thenCall(() => Promise.resolve(avatarPath));
};

export const assertThatFileWasNotMovedToPermStore = (
  appRunner: TestingAppRunner,
  userId: string,
  avatarKey: string,
): void => {
  const mock = appRunner.getMockedProvider(StorageFacade);
  verify(mock.moveFileToPermStorage(avatarKey, userId)).never();
};

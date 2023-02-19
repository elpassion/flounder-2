import { S3StorageAdapterOptions } from './s3/s3-storage-adapter.service';

export type StorageModuleOptions = S3StorageAdapterOptions

export interface IStorageModuleOptionsFactory {
  createStorageModuleOptions(): Promise<StorageModuleOptions> | StorageModuleOptions;
}

export interface ICustomObjectMetadata {
  originalFilename?: string;
  mime?: string;
}

export interface IStorageAdapter {
  getTempfileDestinationUrl(path: string, options?: ICustomObjectMetadata): Promise<string>;
  moveFileToPermStorage(path: string, userId: string): Promise<string>;
  getFileUrl(path: string): Promise<string>;
}

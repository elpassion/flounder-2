import { Injectable } from '@nestjs/common';
import { S3StorageAdapter } from './s3/s3-storage-adapter.service';
import { ICustomObjectMetadata } from './storage.interfaces';

@Injectable()
export class StorageFacade {
  constructor(private readonly adapter: S3StorageAdapter) {}

  public getTempfileDestinationUrl(path: string, options: ICustomObjectMetadata) {
    return this.adapter.getTempfileDestinationUrl(path, options);
  }

  public moveFileToPermStorage(path: string, userId: string): Promise<string> {
    return this.adapter.moveFileToPermStorage(path, userId);
  }

  public getFileUrl(path: string): Promise<string> {
    return this.adapter.getFileUrl(path);
  }
}

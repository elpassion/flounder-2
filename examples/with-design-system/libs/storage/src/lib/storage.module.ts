import { Module } from '@nestjs/common';
import { StorageFacade } from './storage-facade.service';
import { ConfigurableModuleClass } from './storage.module-definition';
import { S3StorageAdapter } from './s3/s3-storage-adapter.service';

@Module({
  providers: [StorageFacade, S3StorageAdapter],
  exports: [StorageFacade]
})
export class StorageModule extends ConfigurableModuleClass {}

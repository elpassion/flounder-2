import { Global, Module } from '@nestjs/common';
import { BaseConfig } from './base-config.service';
import { StorageConfig } from './storage-config.service';

@Global()
@Module({
  providers: [BaseConfig, StorageConfig],
  exports: [BaseConfig, StorageConfig]
})
export class AppConfigModule {}

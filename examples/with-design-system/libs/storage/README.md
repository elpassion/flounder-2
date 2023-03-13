# storage

[comment]: <> (Required section: Description & Functionalities)

## Description

The logic related to store assets in [Amazon S3](https://aws.amazon.com/s3/) storage.

Available via `@flounder/storage`.

## Functionalities

### Allow uploading files to `AWS S3` service

#### Quick start

Import `StorageModule` into your module and use the `register()` method to configure it:

```typescript
import { Module } from '@nestjs/common';
import { StorageModule } from '@flounder/storage';

@Module({
  imports: [
    StorageModule.register({
      temporaryUploadsBucket: 'project-tmp-files',
      mainApplicationStorageBucket: 'project-main-files',
      region: 'eu-west-1',
      isGlobal: false,
    }),
  ],
})
export class AppModule {}
```

Then, the `StorageFacade` instance will be available to inject:

```typescript
import { Controller } from '@nestjs/common';
import { StorageFacade } from '@flounder/storage';

@Controller('images')
export class ImagesController {
  constructor(private readonly storage: StorageFacade) {}
}
```

#### Async configuration

If you need to asynchronously pass module options, use the `registerAsync()` method and return options object from the `useFactory` method.

```typescript
import { Module } from '@nestjs/common';
import { StorageModule } from '@flounder/storage';

@Module({
  imports: [
    StorageModule.registerAsync({
      useFactory: () => ({
        // options
      }),
      inject: [],
    }),
  ],
})
export class AppModule {}
```

This is useful for example when you need to read the options from a configuration provider:

```typescript
import { Module } from '@nestjs/common';
import { StorageModule } from '@flounder/storage';
import { AppConfigModule, AppConfigService } from './app-config.module';

@Module({
  imports: [
    StorageModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfigService) => config.storageOptions,
      inject: [AppConfigService],
    }),
  ],
})
export class AppModule {}
```

Alternatively, you can use the `useClass` syntax:

```typescript
StorageModule.registerAsync({
  useClass: AppConfigService,
});
```

Given above code, `AppConfigService` must provide the `createStorageModuleOptions()` method that will provide the module options:

```typescript
import {
  IStorageModuleOptionsFactory,
  StorageModuleOptions,
} from '@flounder/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService implements IStorageModuleOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createStorageModuleOptions(): StorageModuleOptions {
    return {
      region: this.config.getOrThrow<string>('S3_REGION'),
      mainApplicationStorageBucket: this.config.getOrThrow<string>(
        'MAIN_STORAGE_BUCKET_NAME'
      ),
      temporaryUploadsBucket: this.config.getOrThrow<string>(
        'TEMPORARY_UPLOADS_BUCKET_NAME'
      ),
    };
  }
}
```

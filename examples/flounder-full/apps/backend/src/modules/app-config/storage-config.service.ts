import { IStorageModuleOptionsFactory, StorageModuleOptions } from '@flounder/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ConfigValidator } from '../../shared/common/configuration/config.validator.ts';

class FilesStorageEnvVariables {
  @IsNotEmpty()
  @IsString()
  @Expose()
  S3_REGION!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  MAIN_STORAGE_BUCKET_NAME!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  TEMPORARY_UPLOADS_BUCKET_NAME!: string;
}

@Injectable()
export class StorageConfig implements IStorageModuleOptionsFactory {
  readonly region: string;
  readonly mainApplicationStorageBucket: string;
  readonly temporaryUploadsBucket: string;

  constructor(private readonly configService: ConfigService<FilesStorageEnvVariables>) {
    const config = ConfigValidator.validate(FilesStorageEnvVariables, {
      S3_REGION: configService.get<string>('S3_REGION'),
      MAIN_STORAGE_BUCKET_NAME: configService.get<string>('MAIN_STORAGE_BUCKET_NAME'),
      TEMPORARY_UPLOADS_BUCKET_NAME: configService.get<string>('TEMPORARY_UPLOADS_BUCKET_NAME')
    });

    this.region = config.S3_REGION;
    this.mainApplicationStorageBucket = config.MAIN_STORAGE_BUCKET_NAME;
    this.temporaryUploadsBucket = config.TEMPORARY_UPLOADS_BUCKET_NAME;
  }

  public createStorageModuleOptions(): StorageModuleOptions {
    return this;
  }
}

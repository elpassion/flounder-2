import { randomUUID } from 'node:crypto';
import { extname, normalize } from 'node:path';
import {
  CopyObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { ICustomObjectMetadata, IStorageAdapter } from '../storage.interfaces';
import { MODULE_OPTIONS_TOKEN } from '../storage.module-definition';

export type S3StorageAdapterOptions = {
  temporaryUploadsBucket: string;
  mainApplicationStorageBucket: string;
  region: string;
};

export class S3ClientError extends Error {
  static fromS3ClientSdkError(error: Error) {
    return new S3ClientError(`${error.name} : ${error.message}`);
  }
}

@Injectable()
export class S3StorageAdapter implements IStorageAdapter {
  private readonly client: S3Client;
  private readonly presignExpireIn = 5 * 60;
  private readonly publicDestinationPrefix = 'public';

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly config: S3StorageAdapterOptions
  ) {
    this.client = new S3Client({});
  }

  public async getTempfileDestinationUrl(
    path: string,
    options: ICustomObjectMetadata = {}
  ): Promise<string> {
    const commandInput: PutObjectCommandInput = {
      Bucket: this.config.temporaryUploadsBucket,
      Key: path,
    };

    const Metadata: { [key: string]: string } = {};
    // prettier-ignore
    if (options.originalFilename) Metadata[ObjectMetadata.OriginalFilename] = options.originalFilename;
    if (options.mime) Metadata[ObjectMetadata.ContentType] = options.mime;
    commandInput['Metadata'] = Metadata;

    if (options.mime) commandInput['ContentType'] = options.mime;

    const putCommand = new PutObjectCommand(commandInput);
    try {
      return await getSignedUrl(this.client, putCommand, {
        expiresIn: this.presignExpireIn,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public moveFileToPermStorage(path: string, userId: string): Promise<string> {
    return this.moveFileToMainPermStorage(path, `user-profiles/${userId}`);
  }

  public getFileUrl(path: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.config.mainApplicationStorageBucket,
      Key: path,
    });
    return getSignedUrl(this.client, command, {
      expiresIn: this.presignExpireIn,
    }).catch((error) => this.handleError(error));
  }

  private async moveFileToMainPermStorage(
    path: string,
    prefix = ''
  ): Promise<string> {
    const Key = normalize(
      `${this.publicDestinationPrefix}/${prefix || ''}/${randomUUID()}${extname(
        path
      )}`
    );
    const CopySource = this.source(path);

    await this.copyFileToMainStorage(CopySource, Key);

    return Key;
  }

  private source(path: string): string {
    return normalize(`${this.config.temporaryUploadsBucket}/${path}`);
  }

  private async copyFileToMainStorage(
    CopySource: string,
    Key: string
  ): Promise<void> {
    const copyCommand = new CopyObjectCommand({
      CopySource,
      Bucket: this.config.mainApplicationStorageBucket,
      Key,
    });

    try {
      await this.client.send(copyCommand);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (this.isError(error)) {
      throw S3ClientError.fromS3ClientSdkError(error);
    }
    throw error;
  }

  private isError(error: unknown): error is Error {
    if (typeof error !== 'object') return false;
    if (!error) return false;

    return 'name' in error && 'message' in error;
  }
}

enum ObjectMetadata {
  OriginalFilename = 'original-filename',
  ContentType = 'content-type',
}

import { FileDestinationDto, FileMetadataDto, StorageFacade } from '@flounder/storage';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';

@Injectable()
export class FilesTemporaryFacade {
  constructor(private readonly fileStorage: StorageFacade) {}

  async createFileDestination(
    fileMetadata: FileMetadataDto,
    prefix: string,
  ): Promise<FileDestinationDto> {
    const fileName = this.buildFilename(fileMetadata, prefix);
    const url = await this.getPresignedUrl(fileName, fileMetadata);

    return { url, key: fileName };
  }

  private buildFilename(fileMetadata: FileMetadataDto, prefix: string): string {
    return `${prefix}/tmp-${randomUUID()}${extname(fileMetadata.fileName)}`;
  }

  private getPresignedUrl(fileName: string, fileMetadata: FileMetadataDto): Promise<string> {
    return this.fileStorage.getTempfileDestinationUrl(fileName, {
      originalFilename: fileMetadata.fileName,
      mime: fileMetadata.fileType,
    });
  }
}

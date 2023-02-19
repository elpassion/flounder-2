import { IFileDestinationDto, IFileMetadataDto } from '@flounder/contracts';
import { HttpClient } from '@flounder/http-client';
import { createHttpClient } from '@flounder/next-utils';

export class ImageApi {
  baseUrl = '/api/files';
  private client: HttpClient;

  constructor(client: HttpClient = createHttpClient()) {
    this.client = client;
  }

  async createFileDestination(metadata: IFileMetadataDto): Promise<IFileDestinationDto> {
    return this.client.post(`${this.baseUrl}/images`, metadata);
  }
}

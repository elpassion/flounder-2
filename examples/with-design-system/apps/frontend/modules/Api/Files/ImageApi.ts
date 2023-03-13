import { HttpClient } from '@flounder/http-client';
import { createHttpClient } from '@flounder/next-utils';
import { TFileMetadata, TFileDestination } from '@flounder/storage';

export class ImageApi {
  baseUrl = '/api/files';
  private client: HttpClient;

  constructor(client?: HttpClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = createHttpClient();
    }
  }

  createFileDestination(metadata: TFileMetadata): Promise<TFileDestination> {
    return this.client.post(`${this.baseUrl}/images`, metadata);
  }
}

import { HttpClient } from '@flounder/http-client';
import { createHttpClient } from '@flounder/next-utils';

export class S3Api {
  private client: HttpClient;

  constructor(client: HttpClient = createHttpClient()) {
    this.client = client;
  }

  async putFileToSignedUrl(signedUrl: string, file: File): Promise<void> {
    await this.client.put(signedUrl, file, { headers: { 'Content-Type': file.type } });
  }
}

import { HttpClient } from '@flounder/http-client';
import { createHttpClient } from '@flounder/next-utils';

export class S3Api {
  private client: HttpClient;

  constructor(client?: HttpClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = createHttpClient();
    }
  }

  async putFileToSignedUrl(signedUrl: string, file: File): Promise<void> {
    await this.client.put(signedUrl, file, { headers: { 'Content-Type': file.type } });
  }
}

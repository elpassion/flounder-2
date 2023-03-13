import {
  TMailExample,
  ConflictError,
  isConflictResponseError,
  InvalidFormError,
  isInvalidFormResponseError,
} from '@flounder/contracts';
import { HttpClient } from '@flounder/http-client';
import { createHttpClient } from '@flounder/next-utils';

interface IEmailApi {
  sendExampleEmail: (data: TMailExample) => Promise<TMailExample>;
}

export class EmailApi implements IEmailApi {
  baseUrl = '/api/email/example';
  private client: HttpClient;

  constructor() {
    this.client = createHttpClient();
  }

  async sendExampleEmail(data: TMailExample): Promise<TMailExample> {
    try {
      return await this.client.post(this.baseUrl, data);
    } catch (e: unknown) {
      if (isInvalidFormResponseError(e)) throw new InvalidFormError(e.response.data.message);
      if (isConflictResponseError(e)) throw new ConflictError(e.response.data.message);
      throw e;
    }
  }
}

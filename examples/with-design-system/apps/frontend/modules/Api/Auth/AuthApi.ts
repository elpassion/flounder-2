import { TGetUser, TSignUp } from '@flounder/contracts';
import { HttpClient } from '@flounder/http-client';
import { createHttpClient } from '@flounder/next-utils';

export class AuthApi {
  baseUrl = '/api';
  private client: HttpClient;

  constructor() {
    this.client = createHttpClient();
  }

  async signUp(data: TSignUp): Promise<TGetUser> {
    return await this.client.post(this.baseUrl + '/registration', data);
  }
}

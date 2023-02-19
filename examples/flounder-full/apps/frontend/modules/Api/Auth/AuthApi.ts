import { GetUserDto, SignUpDto } from '@flounder/contracts';
import { HttpClient } from '@flounder/http-client';
import { createHttpClient } from '@flounder/next-utils';

export class AuthApi {
  baseUrl = '/api';
  private client: HttpClient;

  constructor() {
    this.client = createHttpClient();
  }

  async signUp(data: SignUpDto): Promise<GetUserDto> {
    return await this.client.post(this.baseUrl + '/registration', data);
  }
}

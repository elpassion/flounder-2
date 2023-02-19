import { ExtendedUserDto, Paginated, GetUserDto } from '@flounder/contracts';
import { MobileHttpClientWithSession } from '../MobileHttpClientWithSession';

interface IUserApi {
  signInUser: () => Promise<GetUserDto>;
  getCurrentUser: () => Promise<ExtendedUserDto>;
  getUsers: () => Promise<Paginated<ExtendedUserDto>>;
}

export class UserApi implements IUserApi {
  baseUrl = '/api/users';
  private client: MobileHttpClientWithSession = null;

  constructor() {
    this.client = new MobileHttpClientWithSession();
  }

  signInUser(): Promise<GetUserDto> {
    return this.client.post(this.baseUrl, {});
  }

  getCurrentUser(): Promise<ExtendedUserDto> {
    return this.client.get(`${this.baseUrl}/me`);
  }

  getUsers(): Promise<Paginated<ExtendedUserDto>> {
    return this.client.get(this.baseUrl);
  }
}

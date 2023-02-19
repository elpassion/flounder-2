import { createHttpClient } from '@flounder/next-utils';
import {
  ExtendedUserDto,
  Paginated,
  UpdateUserDto,
} from '@flounder/contracts';
import { HttpClient } from '@flounder/http-client';

interface IUserApi {
  getUsers: () => Promise<Paginated<ExtendedUserDto>>;
}

export class UserApi implements IUserApi {
  baseUrl = '/api/users';
  private client: HttpClient;

  constructor(client: HttpClient = createHttpClient()) {
    this.client = client;
  }

  getUser(userId: string): Promise<ExtendedUserDto> {
    return this.client.get(`${this.baseUrl}/${userId}`);
  }

  getCurrentUser(): Promise<ExtendedUserDto> {
    return this.client.get(`${this.baseUrl}/me`);
  }

  updateUser(userId: string, userData: UpdateUserDto): Promise<UpdateUserDto> {
    return this.client.put(`${this.baseUrl}/${userId}`, { ...userData });
  }

  getUsers(): Promise<Paginated<ExtendedUserDto>> {
    return this.client.get(this.baseUrl);
  }

  createUser(): Promise<ExtendedUserDto> {
    return this.client.post(this.baseUrl, {});
  }
}

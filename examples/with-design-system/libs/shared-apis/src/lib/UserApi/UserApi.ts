import { createHttpClient } from '@flounder/next-utils';
import { TExtendedUser, Paginated, TUpdateUser } from '@flounder/contracts';
import { HttpClient } from '@flounder/http-client';

interface IUserApi {
  getUsers: () => Promise<Paginated<TExtendedUser>>;
}

export class UserApi implements IUserApi {
  baseUrl = '/api/users';
  private client: HttpClient;

  constructor(client: HttpClient = createHttpClient()) {
    this.client = client;
  }

  getUser(userId: string): Promise<TExtendedUser> {
    return this.client.get(`${this.baseUrl}/${userId}`);
  }

  getCurrentUser(): Promise<TExtendedUser> {
    return this.client.get(`${this.baseUrl}/me`);
  }

  updateUser(userId: string, userData: TUpdateUser): Promise<TUpdateUser> {
    return this.client.put(`${this.baseUrl}/${userId}`, { ...userData });
  }

  getUsers(): Promise<Paginated<TExtendedUser>> {
    return this.client.get(this.baseUrl);
  }

  createUser(): Promise<TExtendedUser> {
    return this.client.post(this.baseUrl, {});
  }
}

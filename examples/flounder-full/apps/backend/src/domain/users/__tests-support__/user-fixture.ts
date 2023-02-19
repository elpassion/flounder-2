import { randomUUID } from 'node:crypto';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { isNotNil, Optional } from '@flounder/ts-utils';
import { User } from '../user.entity';

type Draft<T extends User> = Optional<T, 'cognito_id' | 'created_at' | 'updated_at'>;

export class UserFixture {
  user: Draft<User>;

  constructor() {
    this.user = {
      email: `john-doe-${randomUUID()}@email.com`,
      first_name: `John`,
      last_name: `Doe`,
      description: `I am John`,
    };
  }

  public withCognitoId(cognitoId: string): UserFixture {
    this.user = { ...this.user, cognito_id: cognitoId };
    return this;
  }

  public withEmail(email: string): UserFixture {
    this.user = { ...this.user, email: email };
    return this;
  }

  public withFirstName(name: string): UserFixture {
    this.user = { ...this.user, first_name: name };
    return this;
  }

  public withLastName(name: string): UserFixture {
    this.user = { ...this.user, last_name: name };
    return this;
  }

  public withAvatarKey(key: string): UserFixture {
    this.user = { ...this.user, avatar_key: key };
    return this;
  }

  public withDescription(description: string): UserFixture {
    this.user = { ...this.user, description: description };
    return this;
  }

  create(): User {
    return {
      ...this.user,
      cognito_id: isNotNil(this.user.cognito_id) ? this.user.cognito_id : randomUUID(),
      created_at: isNotNil(this.user.created_at) ? this.user.created_at : new Date(),
      updated_at: isNotNil(this.user.updated_at) ? this.user.updated_at : new Date(),
    };
  }

  async createAndSaveInDB(app: INestApplication): Promise<User & { cognito_id: string }> {
    const user = this.create();

    const usersRepository = app.get(getRepositoryToken(User));
    const storedUser = await usersRepository.save(user);

    return {
      cognito_id: storedUser.cognito_id,
      email: storedUser.email,
      first_name: storedUser.first_name,
      last_name: storedUser.last_name,
      avatar_key: storedUser.avatar_key,
      created_at: storedUser.created_at,
      updated_at: storedUser.updated_at,
      description: storedUser.description,
    };
  }
}

export const createUserFixture = () => new UserFixture();

export const defaultUser: Draft<User> & { cognito_id: string } = createUserFixture()
  .withCognitoId('123')
  .withEmail('user@example.com')
  .withFirstName('John')
  .withLastName('Doe')
  .withDescription('Description')
  .create();

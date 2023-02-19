import { INestApplication } from '@nestjs/common';
import { User } from '../../src/domain/users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export const getStoredUser = async (app: INestApplication, userId: string): Promise<User> => {
  const usersRepository = app.get(getRepositoryToken(User));
  return usersRepository.findOne({ where: { cognito_id: userId } });
};

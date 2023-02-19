import { GetUsersDto } from './get-users.dto';
import { GetCognitoUserDto } from './get-cognito-user.dto';
import { ExtendedUserDto } from './extended-user.dto';

export const users: GetUsersDto = GetUsersDto.generate(index => ({
  cognito_id: index.toString(),
  email: `example@mail${index + 1}.com`,
  first_name: `John ${index}`,
  last_name: `Galt ${index}`,
  avatar_url: `https://s3.us-west-2.amazonaws.com/${index}.jpg`,
  description: `I am John Galt`,
}));

export const firstUser: GetCognitoUserDto = {
  id: '5af114ac-ca96-4a6c-be1e-c9c631dd7712',
  created_at: '123',
  updated_at: '123',
  mfa_methods: ['totp'],
  mfa_setting: 'off',
  enabled: true,
  status: 'CONFIRMED',
  attributes: {
    email: `firstEmail@email.com`,
    sub: '1',
  },
  groups: ['admin'],
};

export const secondUser: GetCognitoUserDto = {
  id: '05f83027-551d-47ce-891a-d5f9357b0ad3',
  created_at: '123',
  updated_at: '123',
  mfa_methods: ['totp'],
  mfa_setting: 'off',
  enabled: true,
  status: 'CONFIRMED',
  attributes: {
    email: `secondEmail@email.com`,
    sub: '2',
  },
  groups: ['user'],
};

export const exampleUser: ExtendedUserDto = {
  cognito_id: 'exampleId',
  email: 'examplemail@mail.com',
  first_name: 'Ted',
  last_name: 'Kowalski',
  avatar_url: 'https://s3.us-west-2.amazonaws.com/exampleId.jpg',
  description: 'example description',
};

export const editedExampleUser: ExtendedUserDto = {
  cognito_id: 'exampleId',
  email: 'examplemail@mail.com',
  first_name: 'Harry',
  last_name: 'Novack',
  avatar_url: 'avatar-logged.png',
  description: 'example description',
};

export const exampleUserEmailUsedInSession = 'examplemail@mail.com';

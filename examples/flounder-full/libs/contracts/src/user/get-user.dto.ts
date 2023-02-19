export class GetUserDto {
  cognito_id!: string;
  email!: string;
  first_name!: string;
  last_name!: string;
  avatar_key?: string;
  description?: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpsertUserDto {
  @IsNotEmpty()
  @IsString()
  cognito_id!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

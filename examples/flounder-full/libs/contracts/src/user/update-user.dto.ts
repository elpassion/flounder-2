import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString({ message: 'Fist name must be a string' })
  first_name?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  last_name?: string;

  @IsOptional()
  @IsString()
  avatar_key?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Description should have max $constraint1 characters' })
  description?: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailObject {
  @IsEmail()
  @IsNotEmpty()
  emailAddress!: string;

  @IsString()
  @IsNotEmpty()
  subject!: string;


  @IsString()
  @IsNotEmpty()
  body!: string;
}

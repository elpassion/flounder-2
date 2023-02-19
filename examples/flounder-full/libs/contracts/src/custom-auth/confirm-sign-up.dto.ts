import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmSignUpDto {
  @IsString()
  @IsNotEmpty({
    message: 'You have to provide verification code',
  })
  code!: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { IsMatch } from '../decorators';
import { IsValidPassword } from '../decorators';

export class ConfirmForgotPasswordDto {
  @IsNotEmpty({
    message: 'You have to provide code',
  })
  @IsString()
  code!: string;

  @IsValidPassword()
  newPassword!: string;

  @IsMatch('newPassword')
  @IsValidPassword()
  repeatNewPassword!: string;
}

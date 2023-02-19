import { IsMatch, IsValidPassword } from '../decorators';

export class ChangePasswordDto {
  @IsValidPassword()
  oldPassword!: string;

  @IsValidPassword()
  newPassword!: string;

  @IsMatch('newPassword')
  @IsValidPassword()
  repeatNewPassword!: string;
}

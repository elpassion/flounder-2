import { IsEmail, ValidationArguments } from 'class-validator';
import { IsValidPassword } from '../decorators';

export class SignUpDto {
  @IsEmail(
    {},
    {
      message: (args: ValidationArguments) => {
        if (!args.value) {
          return 'You have to provide the e-mail address';
        }
        return 'Invalid email address';
      },
    },
  )
  email!: string;

  @IsValidPassword()
  password!: string;
}

import { IsEmail, ValidationArguments } from 'class-validator';

export class ForgotPasswordDto {
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
}

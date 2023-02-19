import { IsEmail, IsNotEmpty, IsString, ValidationArguments } from 'class-validator';

export class SignInDto {
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
  mail!: string;

  @IsString()
  @IsNotEmpty({
    message: 'You have to provide correct password',
  })
  password!: string;
}

import { IsEmail, ValidationArguments, IsNotEmpty, IsBoolean, Equals } from 'class-validator';

export interface ICreateEmailSubscriptionDto {
  email: string;
}

export class CreateEmailSubscriptionDto {
  @IsEmail(
    {},
    {
      message: (args: ValidationArguments) => {
        if (!args.value) {
          return 'You have to provide your e-mail address';
        }
        return 'Invalid email address';
      },
    },
  )
  email!: string;

  @IsNotEmpty({ message: '"AgreedToTerms" field is required!' })
  @IsBoolean({ message: '"AgreedToTerms" field must be boolean!' })
  @Equals(true, { message: 'Terms not accepted!' })
  agreedToTerms!: boolean;
}

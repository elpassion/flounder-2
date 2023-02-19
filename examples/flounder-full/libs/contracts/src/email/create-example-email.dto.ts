import sanitizeHtml from 'sanitize-html';
import { IsEmail, IsNotEmpty, IsString, ValidationArguments } from 'class-validator';
import { Transform } from 'class-transformer';

export class MailExampleDto {
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
  to!: string;

  @IsString()
  @Transform(params => sanitizeHtml(params.value))
  @IsNotEmpty({
    message: 'You have to provide the e-mail title',
  })
  subject!: string;

  @IsString()
  @Transform(params => sanitizeHtml(params.value))
  @IsNotEmpty({
    message: 'You have to provide the e-mail body',
  })
  text!: string;
}

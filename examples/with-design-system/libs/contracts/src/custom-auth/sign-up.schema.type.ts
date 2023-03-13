import { z } from 'nestjs-zod/z';
import { passwordValidator } from '../validators/password';

export const signUpSchema = z.object({
  email: z
    .string()
    .nonempty('You have to provide the e-mail address')
    .email('Invalid email address'),
  password: passwordValidator,
});

export type TSignUp = z.infer<typeof signUpSchema>;

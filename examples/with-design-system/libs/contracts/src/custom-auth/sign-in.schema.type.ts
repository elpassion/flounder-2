import { z } from 'nestjs-zod/z';

export const signInSchema = z.object({
  mail: z
    .string()
    .nonempty('You have to provide the e-mail address')
    .email('Invalid email address'),
  password: z.string().nonempty('You have to provide correct password'),
});

export type TSignIn = z.infer<typeof signInSchema>;

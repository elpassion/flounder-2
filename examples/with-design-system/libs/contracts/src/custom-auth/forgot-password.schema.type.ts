import { z } from 'nestjs-zod/z';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty('You have to provide the e-mail address')
    .email('Invalid email address'),
});

export type TForgotPassword = z.infer<typeof forgotPasswordSchema>;

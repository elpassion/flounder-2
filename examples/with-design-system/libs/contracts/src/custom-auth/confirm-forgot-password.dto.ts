import { z } from 'nestjs-zod/z';
import { passwordValidator } from '../validators/password';

export const confirmForgotPasswordSchema = z
  .object({
    code: z.string().nonempty('You have to provide code'),
    newPassword: passwordValidator,
    repeatNewPassword: passwordValidator,
  })
  .refine(data => data.newPassword === data.repeatNewPassword, 'New passwords must match');

export type TConfirmPassword = z.infer<typeof confirmForgotPasswordSchema>;

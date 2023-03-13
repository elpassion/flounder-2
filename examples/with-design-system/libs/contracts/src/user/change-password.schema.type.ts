import { z } from 'nestjs-zod/z';
import { passwordValidator } from '../validators/password';

export const changePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: passwordValidator,
    repeatNewPassword: passwordValidator,
  })
  .refine(data => data.newPassword === data.repeatNewPassword, 'New passwords must match');

export type TChangePassword = z.infer<typeof changePasswordSchema>;

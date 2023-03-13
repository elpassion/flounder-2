import { z } from 'nestjs-zod/z';

export const confirmSignUpSchema = z.object({
  code: z.string().nonempty('You have to provide verification code'),
});

export type ConfirmSignUpDto = z.infer<typeof confirmSignUpSchema>;

import { z } from 'nestjs-zod/z';

export const upsertUserSchema = z.object({
  cognito_id: z.string().nonempty(),
  email: z.string().email(),
});

export type TUpsertUser = z.infer<typeof upsertUserSchema>;

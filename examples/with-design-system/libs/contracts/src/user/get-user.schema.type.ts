import { z } from 'nestjs-zod/z';

export const getUserSchema = z.object({
  cognito_id: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  avatar_key: z.string(),
  description: z.string(),
});

export type TGetUser = z.infer<typeof getUserSchema>;

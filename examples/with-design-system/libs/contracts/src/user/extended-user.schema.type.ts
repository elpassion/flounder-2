import { z } from 'nestjs-zod/z';

export const extendedUserSchema = z.object({
  cognito_id: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  avatar_url: z.nullable(z.string()),
  description: z.nullable(z.string()),
});

export type TExtendedUser = z.infer<typeof extendedUserSchema>;

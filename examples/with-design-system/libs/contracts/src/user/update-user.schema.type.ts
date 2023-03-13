import { z } from 'nestjs-zod/z';

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  first_name: z.string({ invalid_type_error: 'First name must be a string' }).optional(),
  last_name: z.string({ invalid_type_error: 'Last name must be a string' }).optional(),
  avatar_key: z.string().optional(),
  description: z
    .string()
    .max(200, 'Description should have max $constraint1 characters')
    .optional(),
});

export type TUpdateUser = z.infer<typeof updateUserSchema>;

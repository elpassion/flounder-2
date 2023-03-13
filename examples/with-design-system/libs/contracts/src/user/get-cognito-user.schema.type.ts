import { z } from 'nestjs-zod/z';

export const getCognitoUserSchema = z.object({
  id: z.string().optional(),
  mfa_setting: z.string().optional(),
  mfa_methods: z.array(z.string()).optional(),
  enabled: z.boolean().optional(),
  status: z.string().optional(),
  created_at: z.union([z.date(), z.string()]).optional(),
  updated_at: z.union([z.date(), z.string()]).optional(),
  attributes: z.object({
    email: z.string().optional(),
    sub: z.string().optional(),
  }),
  groups: z.array(z.string().optional()).optional(),
});

export type TGetCognitoUser = z.infer<typeof getCognitoUserSchema>;

import { z } from 'nestjs-zod/z';

export const emailSubscriptionSchema = z.object({
  email: z.string().email(),
  id: z.number(),
  updated_at: z.union([z.date(), z.string()]),
  created_at: z.union([z.date(), z.string()]),
});

export type TEmailSubscription = z.infer<typeof emailSubscriptionSchema>;

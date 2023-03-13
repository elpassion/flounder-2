import { z } from 'nestjs-zod/z';

export const badRequestSchema = z.object({
  statusCode: z.literal(400),
  message: z.array(z.object({})),
  error: z.literal('Bad Request'),
});

export const conflictSchema = z.object({
  statusCode: z.literal(409),
  message: z.string(),
});

export type TConflict = z.infer<typeof conflictSchema>;
export type TBadRequest = z.infer<typeof badRequestSchema>;

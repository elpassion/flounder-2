import { z } from 'nestjs-zod/z';

export const passwordValidator = z
  .string()
  .min(6, 'Min 6 chars')
  .regex(/(?=.*[A-Z])/, 'At least one uppercase letter')
  .regex(/(?=.*[a-z])/, 'At least one lowercase letter')
  .regex(/(?=.*\d)/, 'At least one number');

import { z } from 'nestjs-zod/z';
import { FeatureFlagsEnum } from './feature-flags.enum';

export const featureFlagSchema = z.object({
  name: z.nativeEnum(FeatureFlagsEnum),
  isActive: z.boolean(),
});

export type TFeatureFlag = z.infer<typeof featureFlagSchema>;

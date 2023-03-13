import { z } from 'nestjs-zod/z';

export const createEmailSubscriptionSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'You have to provide your e-mail address' })
    .email({ message: 'Invalid email address' }),
  agreedToTerms: z.literal<boolean>(true, {
    required_error: '"AgreedToTerms" field is required!',
    invalid_type_error: '"AgreedToTerms" field must be boolean!',
  }),
});

export type TCreateEmailSubscription = z.infer<typeof createEmailSubscriptionSchema>;

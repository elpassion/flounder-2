import sanitizeHtml from 'sanitize-html';
import { z } from 'nestjs-zod/z';

export const mailExampleSchema = z.object({
  to: z.string().nonempty('You have to provide the e-mail address').email('Invalid email address'),
  subject: z
    .string()
    .nonempty('You have to provide the e-mail title')
    .transform(value => sanitizeHtml(value)),
  text: z
    .string()
    .nonempty('You have to provide the e-mail body')
    .transform(value => sanitizeHtml(value)),
});

export type TMailExample = z.infer<typeof mailExampleSchema>;

import { z } from 'nestjs-zod/z';

export const notificationSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type TNotification = z.infer<typeof notificationSchema>;

export class NotificationDTO implements TNotification {
  title!: string;
  description!: string;
}

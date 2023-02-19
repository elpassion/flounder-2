import { NotificationDTO } from '../websocket';

export const notificationsMock: NotificationDTO[] = [...Array(7)].map((_e, index) => ({
  title: `New notification ${index + 1}`,
  description: `More info about notification with number ${index + 1}, you can read it later`,
}));

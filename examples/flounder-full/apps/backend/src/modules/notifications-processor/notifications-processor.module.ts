import { Module } from '@nestjs/common';
import { NotificationsQueue } from '../queue/queues/notifications.queue';
import { NotificationsConsumer } from './consumers/notifications.consumer';
import { WebSocketModule } from '@flounder/websocket';

@Module({
  imports: [NotificationsQueue, WebSocketModule],
  providers: [NotificationsConsumer],
})
export class NotificationsProcessor {}

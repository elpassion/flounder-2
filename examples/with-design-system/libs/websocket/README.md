# websocket
## Description
A [Nest](https://github.com/nestjs/nest) module wrapper for **websockets**.

This package is using [@nestjs/websockets](https://www.npmjs.com/package/@nestjs/websockets) and [socket.io](https://socket.io/) under the hood.

Available via `@flounder/websocket`.

## Functionalities
### Initiate websocket server on backend
- This is ready-to-go starter code that you can extend. It allows creating `Nest` module.
### Send notifications
- `sendNotification` method allow emitting notifications (e.g. about new subscriptions).

## Quick start
Import `WebSocketModule` from `@flounder/websocket` inside module which needs to use websocket's, ex.

```typescript
import { Module } from '@nestjs/common';
import { WebSocketModule } from '@flounder/websocket';
import { NotificationsConsumer } from './consumers/notifications.consumer';

@Module({
  imports: [WebSocketModule],
  providers: [NotificationsConsumer],
})
export class NotificationsProcessor {}
```

Afterward, the websocket instance will be available to inject across entire module, ex.

```typescript
import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { WSGateway } from '@flounder/websocket';

@Processor('NOTIFICATIONS')
export class NotificationsConsumer {
  constructor(private readonly webSocketGateway: WSGateway) {}

  @Process()
  async sendNotification(job: Job<unknown>) {
    this.webSocketGateway.sendNotification(data);
  }
}
```

Server emits message to all connected clients.

### Default path to websockets

`/api/socket`

You can configure path to websocket's with setting env variable `WEBSOCKET_PATH`.

## Available methods

```typescript
sendNotification: (payload: unknown) => boolean;
```

## Future plans

- server can emit messages to individual clients
- server can emit messages to group of clients

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  path: process.env.WEBSOCKET_PATH || '/api/socket',
})
export class WSGateway {
  @WebSocketServer()
  server!: Server;

  sendNotification(payload: unknown) {
    return this.server.emit('notification', payload);
  }
}

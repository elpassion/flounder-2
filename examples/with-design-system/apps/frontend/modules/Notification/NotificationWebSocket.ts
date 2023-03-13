import { io, Socket } from 'socket.io-client';
import { NotificationDTO } from '@flounder/contracts';

enum NotificationWebSocketEventType {
  NOTIFICATION = 'notification',
}

export interface INotificationCallback {
  (notification: NotificationDTO): void;
}

export interface INotificationWebSocket {
  connect(): void;

  disconnect(): void;

  onNotification(callback: INotificationCallback): void;

  isConnected(): boolean;
}

export class NotificationWebSocket implements INotificationWebSocket {
  private socket!: Socket;
  private pathUrl = '/api/socket';

  public connect() {
    this.socket = io({ path: this.pathUrl });
  }

  public disconnect() {
    if (this.isConnected()) {
      this.socket?.removeAllListeners();
      this.socket?.close();
    }
  }

  public onNotification(callback: INotificationCallback) {
    this.socket.on(NotificationWebSocketEventType.NOTIFICATION, callback);
  }

  public isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

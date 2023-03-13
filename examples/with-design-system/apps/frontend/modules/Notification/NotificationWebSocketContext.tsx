import { useContext, createContext } from 'react';
import { NotificationDTO } from '@flounder/contracts';
import { INotificationWebSocket, NotificationWebSocket } from './NotificationWebSocket';

const notificationWebSocket = new NotificationWebSocket();

export const NotificationWebSocketContext = createContext<INotificationWebSocket>({
  connect: () => {
    notificationWebSocket.connect();
  },
  disconnect: () => {
    notificationWebSocket.disconnect();
  },
  onNotification: (callback: (notification: NotificationDTO) => void) => {
    notificationWebSocket.onNotification(callback);
  },
  isConnected: () => {
    return notificationWebSocket.isConnected();
  },
});

export const useNotification = () => {
  return useContext(NotificationWebSocketContext);
};

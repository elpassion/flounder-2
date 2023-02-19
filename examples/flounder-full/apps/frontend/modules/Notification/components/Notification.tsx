import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import { NotificationDTO } from '@flounder/contracts';
import { NotificationsMenu } from '@flounder/ui';
import { useNotification } from '../NotificationWebSocketContext';

export const Notification = () => {
  const isNotificationsLoaded = useRef(false);
  const { currentUser: session } = useAuth();
  const notificationWebSocket = useNotification();
  const [isSessionEstablished, setIsSessionEstablished] = useState(false);
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);

  useEffect(() => {
    if (session) {
      setIsSessionEstablished(true);
    }
  }, [session]);

  useEffect(() => {
    if (isSessionEstablished && !notificationWebSocket.isConnected()) {
      notificationWebSocket.connect();
      notificationWebSocket.onNotification(notification => {
        setNotifications(prev => [...prev, notification]);
      });
    }
    return () => {
      notificationWebSocket.disconnect();
    };
  }, [isSessionEstablished]);

  useEffect(() => {
    if (isNotificationsLoaded.current) {
      localStorage.setItem('flounder-notifications', JSON.stringify(notifications));
    } else {
      const items = localStorage.getItem('flounder-notifications');
      if (items) {
        setNotifications(JSON.parse(items));
      }
      isNotificationsLoaded.current = true;
    }
  }, [notifications]);

  const areNotificationsPresent = useMemo(() => notifications.length > 0, [notifications]);

  return (
    <NotificationsMenu.Menu notificationsCount={notifications.length}>
      <NotificationsMenu.HeaderItem>
        <FormattedMessage id="notifications.header" defaultMessage="Notifications" />
      </NotificationsMenu.HeaderItem>
      {areNotificationsPresent ? (
        <NotificationsMenu.List>
          {notifications.map(notification => (
            <NotificationsMenu.ListItem
              notification={notification}
              key={notification.title}
              onClick={notification => {
                setNotifications(notifications.filter(el => el.title !== notification.title));
              }}
            />
          ))}
        </NotificationsMenu.List>
      ) : (
        <NotificationsMenu.EmptyState>
          <FormattedMessage id="notifications.noNotifications" defaultMessage="No notifications" />
        </NotificationsMenu.EmptyState>
      )}
    </NotificationsMenu.Menu>
  );
};

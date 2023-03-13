import { Story } from '@storybook/react';
import {
  INotificationMenuNotification,
  NotificationsMenu as NotificationsExample,
} from '.';

export default {
  title: 'Organisms/Notifications',
  component: NotificationsExample,
};

const Template: Story<{ notifications: INotificationMenuNotification[] }> = (
  args
) => {
  const areNotificationsPresent = args.notifications.length !== 0;

  return (
    <div className="w-4/5 flex justify-end">
      <NotificationsExample.Menu notificationsCount={args.notifications.length}>
        <NotificationsExample.HeaderItem>
          Notifications
        </NotificationsExample.HeaderItem>
        {areNotificationsPresent ? (
          <NotificationsExample.List>
            {args.notifications.map((notification) => (
              <NotificationsExample.ListItem
                notification={notification}
                key={notification.title}
              />
            ))}
          </NotificationsExample.List>
        ) : (
          <NotificationsExample.EmptyState>
            No notifications
          </NotificationsExample.EmptyState>
        )}
      </NotificationsExample.Menu>
    </div>
  );
};

export const Notifications = Template.bind({});

Notifications.args = {
  notifications: [{ title: 'Sample', description: 'example notification' }],
};

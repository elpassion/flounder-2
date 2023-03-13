import { render } from '@testing-library/react';
import { findByText, getByTestId } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { INotificationMenuNotification } from '../index';
import { NotificationsMenu } from '../index';

describe('NotificationsMenu', () => {
  it('should display empty notification list', async () => {
    // Given
    const notificationMenuContainer = new NotificationMenuObject();
    const { container, notificationButton } =
      await notificationMenuContainer.getElements();

    // When
    await userEvent.click(notificationButton);

    // Then
    expect(notificationButton).toBeTruthy();
    await findByText(container, /^Notifications$/);
    await findByText(container, /^No notifications$/);
  });

  it('should display one notification in the list', async () => {
    // Given
    const notificationMenuContainer = new NotificationMenuObject([
      {
        title: 'Notification 1',
        description: 'Description 1',
      },
    ]);
    const { container, notificationButton } =
      await notificationMenuContainer.getElements();

    // When
    await userEvent.click(notificationButton);

    // Then
    expect(notificationButton).toBeTruthy();
    await findByText(container, /^Notifications$/);
    await findByText(container, /^Notification 1$/);
    await findByText(container, /^Description 1$/);
  });
});

class NotificationMenuObject {
  public notifications: INotificationMenuNotification[];

  constructor(notifications: INotificationMenuNotification[] = []) {
    this.notifications = notifications;
  }

  public async getElements() {
    const { container } = await this.render();
    const notificationButton = await getByTestId(
      container,
      'notificationButton'
    );
    return { container, notificationButton };
  }

  public async render() {
    return render(
      <NotificationsMenu.Menu notificationsCount={this.notifications.length}>
        <NotificationsMenu.HeaderItem>
          Notifications
        </NotificationsMenu.HeaderItem>
        {this.notifications.length > 0 ? (
          <NotificationsMenu.List>
            {this.notifications.map((notification) => (
              <NotificationsMenu.ListItem
                notification={notification}
                key={notification.title}
              />
            ))}
          </NotificationsMenu.List>
        ) : (
          <NotificationsMenu.EmptyState>
            No notifications
          </NotificationsMenu.EmptyState>
        )}
      </NotificationsMenu.Menu>
    );
  }
}

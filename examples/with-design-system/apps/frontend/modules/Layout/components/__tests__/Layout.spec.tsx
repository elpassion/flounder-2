import React from 'react';
import { findByTestId, findByText, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  TExtendedUser,
  GetUsersDto,
  NotificationDTO,
  notificationsMock,
  users,
} from '@flounder/contracts';
import { queryKeys } from 'utils/queryKeys';
import { RenderContext } from '../../../../test/RenderContext';
import { NotificationWebSocketContext, INotificationCallback } from '../../../Notification';
import { handlers as userHandlers } from '../../../User/handlers';
import Layout from '../Layout';

describe(Layout.name, () => {
  it('should correctly add new notification where user is logged in', async () => {
    // Given
    const layoutPage = await new LayoutObject()
      .setAuthenticatedAs({
        first_name: 'test',
        last_name: 'test',
        email: 'test@test.com',
        cognito_id: '312312-312312312-321',
        avatar_url: 'images/edasdasdasdas.jpeg',
        description: 'test',
      })
      .render();

    const { notificationButton } = await layoutPage.getNotificationElements();

    await userEvent.click(notificationButton);

    const { notificationMenu } = await layoutPage.getNotificationElements();

    await findByText(notificationMenu, /^Notifications$/);
    await findByText(notificationMenu, /^No notifications$/);

    // When & Then
    await waitFor(() => layoutPage.sendNotification(notificationsMock[0]));

    await findByText(
      notificationMenu,
      /^More info about notification with number 1, you can read it later$/,
    );
    await findByText(notificationMenu, /New notification 1/i);

    await waitFor(() => layoutPage.sendNotification(notificationsMock[1]));
    await waitFor(() => layoutPage.sendNotification(notificationsMock[2]));
    await waitFor(() => layoutPage.sendNotification(notificationsMock[3]));

    for (const notificationNumber of [...new Array(4)].map((_, index) => index + 1)) {
      await findByText(
        notificationMenu,
        `More info about notification with number ${notificationNumber}, you can read it later`,
      );
      await findByText(notificationMenu, `New notification ${notificationNumber}`);
    }
  });
});

class LayoutObject {
  public context = new RenderContext();
  public container!: HTMLElement;
  public isSocketConnected!: boolean;

  constructor() {
    this.withUsersHandlers();
    this.withInitialUsers(users);
  }

  public render = () => {
    const renderResult = this.context.render(
      <NotificationWebSocketContext.Provider
        value={{
          connect: () => {
            this.isSocketConnected = true;
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          disconnect: () => {},
          onNotification: callback => {
            this._sendNotification = callback;
          },
          isConnected: () => {
            return false;
          },
        }}
      >
        <Layout />
      </NotificationWebSocketContext.Provider>,
    );
    this.container = renderResult.container;
    return this;
  };

  public sendNotification = (notification: NotificationDTO) => {
    if (this._sendNotification === undefined) throw new Error('assign _sendNotification first.');
    this._sendNotification(notification);
  };
  public getNotificationElements = async (container: HTMLElement = this.container) => {
    const notificationButton = await findByTestId(container, 'notificationButton');
    const notificationMenu = await findByTestId(container, 'notificationMenu');

    return { notificationButton, notificationMenu };
  };

  public withInitialUsers = (users: GetUsersDto) => {
    this.context.queryClient.setQueryData(queryKeys.users.all.queryKey, users);
    return this;
  };

  public setAuthenticatedAs = (user: TExtendedUser) => {
    this.context.setAuthenticatedAs(user);
    return this;
  };

  private _sendNotification: INotificationCallback | undefined;

  private withUsersHandlers = () => {
    this.context.server.use(...userHandlers);
    return this;
  };
}

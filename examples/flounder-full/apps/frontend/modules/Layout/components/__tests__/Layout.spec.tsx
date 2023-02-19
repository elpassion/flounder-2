import React from 'react';
import {
  findByTestId,
  findByText,
  queryByTestId,
  queryByText,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ExtendedUserDto,
  GetUsersDto,
  NotificationDTO,
  notificationsMock,
  users,
} from '@flounder/contracts';
import { RenderContext } from '../../../../test/RenderContext';
import { NotificationWebSocketContext, INotificationCallback } from '../../../Notification';
import { handlers as userHandlers } from '../../../User/handlers';
import Layout from '../Layout';

describe(Layout.name, () => {
  it('Show layout for not logged user', async () => {
    const { container } = await new LayoutObject().render();

    await findByText(container, /Not signed in/);
  });

  it('Show currently logged in user email', async () => {
    // When
    const { container } = await new LayoutObject()
      .setAuthenticatedAs({
        first_name: 'test',
        last_name: 'test',
        email: 'test@test.com',
        cognito_id: '312312-312312312-321',
        avatar_url: 'images/edasdasdasdas.jpeg',
        description: 'test',
      })
      .render();

    // Then
    await findByText(container, /^Signed in as test@test\.com$/);
  });
  it('Show currently logged in user first name', async () => {
    // When
    const { container } = await new LayoutObject()
      .setAuthenticatedAs({
        first_name: 'test',
        last_name: 'test',
        email: 'test@test.com',
        cognito_id: '312312-312312312-321',
        avatar_url: 'images/edasdasdasdas.jpeg',
        description: 'test',
      })
      .render();

    // Then
    expect(await findByText(container, /^test$/)).toBeInTheDocument();
  });
  it('Should hide UserMenu if user not logged in', async () => {
    // When
    const { container } = await new LayoutObject().render();

    // Then
    expect(await queryByText(container, /^test$/)).not.toBeInTheDocument();
  });
  it('should display no notification button before login', async () => {
    // When
    const layout = await new LayoutObject().render();

    // Then
    const { container } = layout;
    const notificationButton = queryByTestId(container, 'notificationButton');
    expect(notificationButton).toBeNull();
  });

  it('should connect to websocket after user login', async () => {
    // When
    const layout = await new LayoutObject()
      .setAuthenticatedAs({
        first_name: 'test',
        last_name: 'test',
        email: 'test@test.com',
        cognito_id: '312312-312312312-321',
        avatar_url: 'images/edasdasdasdas.jpeg',
        description: 'test',
      })
      .render();

    // Then
    expect(layout.isSocketConnected).toBeTruthy();
  });
  it('should remove notification after click', async () => {
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
    await waitFor(() => layoutPage.sendNotification(notificationsMock[0]));

    const { notificationButton, notificationMenu } = await layoutPage.getNotificationElements();

    await userEvent.click(notificationButton);

    const notification = await findByText(
      notificationMenu,
      /^More info about notification with number 1, you can read it later$/,
    );

    // When
    await userEvent.click(notification);
    await userEvent.click(notificationButton);

    // Then
    expect(await findByText(notificationMenu, /^Notifications$/)).toBeInTheDocument();
    expect(await findByText(notificationMenu, /^No notifications$/)).toBeInTheDocument();
  });

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
    this.context.queryClient.setQueryData(['users'], users);
    return this;
  };

  public setAuthenticatedAs = (user: ExtendedUserDto) => {
    this.context.setAuthenticatedAs(user);
    return this;
  };

  private _sendNotification: INotificationCallback | undefined;

  private withUsersHandlers = () => {
    this.context.server.use(...userHandlers);
    return this;
  };
}

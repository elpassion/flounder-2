import React, { CSSProperties, ReactNode } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';

export interface INotificationMenuNotification {
  title: string;
  description: string;
}

export interface IconProps {
  className?: string;
  style?: CSSProperties;
}

function Menu({
  children,
  notificationsCount,
  onClick,
}: {
  children: ReactNode;
  notificationsCount: number;
  onClick?: () => void;
}) {
  const areNotificationsPresent = notificationsCount !== 0;
  return (
    <HeadlessMenu
      as="div"
      className="relative inline-block text-left"
      data-testid="notificationMenu"
      onClick={onClick}
    >
      <div>
        <HeadlessMenu.Button
          data-testid="notificationButton"
          className="inline-flex border-0 p-1 justify-center items-center bg-transparent cursor-pointer relative"
        >
          <NotificationIcon className="w-5 h-5" />
          {areNotificationsPresent && (
            <div className="flex bg-red-600 text-white w-4 h-4 text-xs leading-3 justify-center items-center rounded-full absolute left-1/2 -top-1">
              <span>{notificationsCount}</span>
            </div>
          )}
        </HeadlessMenu.Button>
      </div>
      <HeadlessMenu.Items
        as="div"
        className="absolute rounded-xl bg-white w-72 shadow-md right-0 m-0 flex flex-col"
      >
        {children}
      </HeadlessMenu.Items>
    </HeadlessMenu>
  );
}

function HeaderItem({ children }: { children: React.ReactNode }) {
  return (
    <HeadlessMenu.Item
      as="div"
      className="px-5 py-3 border-b-gray-300 border-b border-solid"
    >
      <p className="text-center font-medium m-0">{children}</p>
    </HeadlessMenu.Item>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <HeadlessMenu.Item as="div" className="font-light px-5 py-3">
      <span className="text-sm">{children}</span>
    </HeadlessMenu.Item>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex flex-col p-0 max-h-80 overflow-y-auto">{children}</ul>
  );
}

function ListItem({
  notification,
  onClick,
}: {
  notification: INotificationMenuNotification;
  onClick?: (el: INotificationMenuNotification) => void;
}) {
  return (
    <HeadlessMenu.Item
      onClick={() => onClick && onClick(notification)}
      as="li"
      className="block py-1.5 px-5 first-of-type:pt-3 last-of-type:pb-3 cursor-pointer"
    >
      <div className="font-medium text-sm">{notification.title}</div>
      <div className="font-light text-xs">{notification.description}</div>
    </HeadlessMenu.Item>
  );
}

const NotificationIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>
);

export const NotificationsMenu = {
  Menu,
  HeaderItem,
  EmptyState,
  List,
  ListItem,
};

import classNames from "classnames";
import Avatar from "../Avatar";
import Button from "../Button";
import IconButton from "../IconButton";
import Indicator from "../Indicator";
import * as NotificationComponents from "./";
import * as Skeleton from "../Skeleton";
import type {
  ContainerProps,
  EventProps,
  NotificationProps,
} from "./Notification.interface";

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => (
  <div
    className={classNames(
      "shadow-elevatio-sm w-full divide-y rounded-lg bg-white",
      className
    )}
  >
    {children}
  </div>
);

export const SingleNotification: React.FC<EventProps> = ({
  name,
  message,
  time,
  details,
  isNew,
  ...avatarProps
}) => (
  <div className="flex items-start gap-4 py-3 px-4 text-sm">
    <Avatar {...avatarProps} />
    <div className="flex-1">
      <p className="flex gap-2 text-neutral-600">
        <span className="font-medium">{name}</span> {message}
      </p>
      <p className="text-xs text-neutral-400">{time}</p>
      <p className="mt-1 border-l-[3px] border-neutral-100 pl-1 text-neutral-400">
        {details}
      </p>
    </div>
    {isNew && <Indicator variant="default" type="processing" />}
  </div>
);

export const EventSkeleton: React.FC = () => (
  <div className="flex animate-pulse items-start gap-4 py-3 px-4 text-sm">
    <Skeleton.Circle height="h-10" width="w-10" />
    <div className="flex-1">
      <div className="mb-1 flex gap-2">
        <Skeleton.Text />
        <Skeleton.Text width="w-44" />
      </div>
      <Skeleton.Text height="h-3" width="w-16" />
      <div className="mt-1 flex gap-2">
        <Skeleton.Text width="w-3" />
        <Skeleton.Text width="w-44" />
      </div>
    </div>
  </div>
);

export const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-4 px-4 py-6">
    <div className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-50">
      <span className="font-icons text-[102px] text-blue-400">&#xeaf8;</span>
    </div>
    <p className="w-44 text-center text-sm">
      We’ll let you know when we get news for you.
    </p>
  </div>
);

export const Notification: React.FC<NotificationProps> = ({
  events,
  ...avatarProps
}) => (
  <NotificationComponents.Container>
    <div className="flex items-center p-2 pl-4 text-neutral-900">
      <p className="flex-1 text-sm font-medium">Notification</p>
      <Button
        variant="ghost"
        text="Mark all as read"
        // @todo: Refactor buttons to pass SVG props and replace
        leftIcon="&#xeace"
        size="sm"
        className={classNames(
          "px-3 py-2 text-blue-500",
          "hover:bg-transparent hover:text-blue-700 hover:shadow-none",
          "active:bg-transparent active:text-blue-800"
        )}
      />
      <IconButton
        variant="ghost"
        // @todo: Refactor buttons to pass SVG props and replace
        icon="&#xea29"
        size="sm"
        className={classNames(
          "text-neutral-900",
          "hover:bg-transparent hover:text-neutral-900 hover:shadow-none",
          "active:bg-transparent active:text-neutral-900"
        )}
      />
    </div>
    {events ? (
      <>
        {events.map(({ ...props }) => (
          <NotificationComponents.SingleNotification
            {...props}
            {...avatarProps}
          />
        ))}
        <NotificationComponents.EventSkeleton />
        <NotificationComponents.EventSkeleton />
      </>
    ) : (
      <NotificationComponents.EmptyState />
    )}
    <footer className="flex items-center justify-end p-4">
      <Button
        variant="primary"
        size="sm"
        text="View all notification"
        className={classNames(
          "border-blue-500 bg-blue-500",
          "hover:border-blue-700 hover:bg-blue-700",
          "active:border-blue-800 active:bg-blue-800"
        )}
      />
    </footer>
  </NotificationComponents.Container>
);

export default Notification;

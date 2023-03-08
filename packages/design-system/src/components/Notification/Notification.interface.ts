import type { AvatarProps } from "../../components/Avatar/Avatar.interface";

interface EventInterface {
  name: string;
  src: string;
  message: string;
  time: string;
  details?: string;
  isNew?: boolean;
}

export interface ContainerProps extends React.PropsWithChildren {
  className?: string;
}

export interface EventProps
  extends Pick<AvatarProps, "contentType" | "shape">,
    EventInterface {}

export interface NotificationProps
  extends Pick<AvatarProps, "contentType" | "shape"> {
  events?: EventInterface[];
}

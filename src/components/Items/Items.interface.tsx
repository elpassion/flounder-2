import { AvatarProps } from "components/Avatar/Avatar.interface";
import { IconTypes } from "utils/iconType";

type ItemVariants = "onlyIcon" | "fullWidth";

export interface ContainerProps extends React.PropsWithChildren {
  className?: string;
}

export interface IconProps {
  icon: IconTypes;
  className?: string;
}

export interface MenuItemProps {
  text: string;
  variant?: ItemVariants;
  leftIcon?: IconTypes;
  middleIcon?: IconTypes;
  rightIcon?: IconTypes;
}

export interface WorkspaceItemProps
  extends Pick<AvatarProps, "shape" | "src" | "contentType" | "alt"> {
  size?: "sm" | "md" | "lg";
  variant?: ItemVariants;
}

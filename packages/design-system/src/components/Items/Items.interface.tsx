import { TIcon } from "../../helpers/types";
import type { IconTypes } from "../../utils/iconType";
import type { AvatarProps } from "../Avatar/Avatar.interface";

type ItemVariants = "onlyIcon" | "fullWidth" | "fitWidth";

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
  leftIcon?: TIcon;
  middleIcon?: TIcon;
  rightIcon?: TIcon;
}

export interface WorkspaceItemProps
  extends Pick<AvatarProps, "shape" | "src" | "contentType" | "alt"> {
  size?: "sm" | "md" | "lg";
  variant?: ItemVariants;
}

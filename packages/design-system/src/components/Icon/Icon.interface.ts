import type { HTMLAttributes } from "react";
import type { TIcon } from "../../helpers/types";
import type { IconTypes } from "../../utils/iconType";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  icon?: IconTypes;
  customIcon?: TIcon;
  iconName?: string;
  size?: "none" | "sm" | "md" | "lg";
  className?: string;
}

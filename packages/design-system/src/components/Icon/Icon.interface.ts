import type { HTMLAttributes, ReactNode } from "react";
import type { IconTypes } from "../../utils/iconType";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  icon?: IconTypes;
  customIcon?: ReactNode;
  iconName?: string;
  size?: "none" | "sm" | "md" | "lg";
  className?: string;
}

import type { HTMLAttributes } from "react";
import type { IconTypes } from "../../utils/iconType";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  icon: string;
  size?: "none" | "sm" | "md" | "lg";
  className?: string;
}

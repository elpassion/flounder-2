import type { HTMLAttributes } from "react";
import type { IconTypes } from "../../utils/iconType";

export interface IconProps
  extends HTMLAttributes<HTMLSpanElement> {
  icon: IconTypes;
  size?: "sm" | "md" | "lg";
}
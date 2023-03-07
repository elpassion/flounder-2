import { IconTypes } from "utils/iconType";
import type { HTMLAttributes } from "react";

export interface IconButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  icon: IconTypes;
  variant:
    | "primary"
    | "outlined"
    | "ghost"
    | "destructive"
    | "destructiveOutlined"
    | "destructiveGhost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  ariaLabel?: string;
}

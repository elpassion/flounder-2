import type { HTMLAttributes } from "react";
import type { IconTypes } from "../../utils/iconType";

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

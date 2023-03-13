import type { HTMLAttributes } from "react";
import type { TIcon } from "../../helpers/types";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: TIcon;
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

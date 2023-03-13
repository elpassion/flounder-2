import type { TIcon } from "../../helpers/types";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  variant:
    | "primary"
    | "outlined"
    | "ghost"
    | "destructive"
    | "destructiveGhost"
    | "destructiveOutlined";
  leftIcon?: TIcon;
  rightIcon?: TIcon;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  isFluid?: boolean;
}

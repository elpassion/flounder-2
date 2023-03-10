import type { IconTypes } from "../../utils/iconType";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  variant:
    | "primary"
    | "outlined"
    | "ghost"
    | "destructive"
    | "destructiveGhost"
    | "destructiveOutlined";
  leftIcon?: IconTypes;
  rightIcon?: IconTypes;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  isFluid?: boolean;
}

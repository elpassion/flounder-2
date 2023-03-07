import { ButtonProps } from "components/Button/Button.interface";
export interface ButtonGroupProps extends Pick<ButtonProps, "size"> {
  buttons: Omit<ButtonProps, "size" | "variant">[];
  variant: "primary" | "outlined" | "ghost";
  style: "default" | "withIcon" | "withText";
}

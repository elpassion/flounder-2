import type { IconButtonProps } from "../IconButton/IconButton.interface";

export interface IconButtonGroupProps extends Pick<IconButtonProps, "size"> {
  buttons: Omit<IconButtonProps, "size" | "variant">[];
  variant: "primary" | "outlined" | "ghost";
}

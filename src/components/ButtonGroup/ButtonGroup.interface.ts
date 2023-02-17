import { ButtonProps } from "../Button/Button.stories";

export interface ButtonGroupProps
  extends Pick<ButtonProps, "size" | "variant"> {
  buttons: Omit<ButtonProps, "size" | "variant">[];
  style: "default" | "withIcon" | "withText";
}

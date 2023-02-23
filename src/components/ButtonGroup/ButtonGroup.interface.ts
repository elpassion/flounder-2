import { ButtonProps } from "components/Button";

export interface ButtonGroupProps
  extends Pick<ButtonProps, "size" | "variant"> {
  buttons: Omit<ButtonProps, "size" | "variant">[];
  style: "default" | "withIcon" | "withText";
}

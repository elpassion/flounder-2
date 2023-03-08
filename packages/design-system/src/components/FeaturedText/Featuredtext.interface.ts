import { TIcon } from "helpers/types";

export interface FeaturedTextProps {
  iconPosition: "iconTop" | "iconLeft"; // ?
  align?: "center" | "left"; // default center
  size: "sm" | "md" | "lg";
  icon?: TIcon;
  title: string;
  content: string;
}

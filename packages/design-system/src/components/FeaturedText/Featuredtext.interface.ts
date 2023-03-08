import { TIcon } from "helpers/types";

export interface FeaturedTextProps {
  variant: "iconTop" | "iconLeft" | "text"; // ?
  align?: "center" | "left"; // default center
  size: "sm" | "md" | "lg";
  icon?: TIcon;
  title: string;
  content: string;
}

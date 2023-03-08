import { IconTypes } from "../../utils/iconType";

export interface InlineMessageProps {
  icon?: IconTypes;
  text: string;
  variant?: "default" | "success" | "warning" | "info" | "error";
  className?: string;
}

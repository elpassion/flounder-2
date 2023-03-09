import { TIcon } from "../../helpers/types";

export interface InlineMessageProps {
  icon?: TIcon;
  text: string;
  variant?: "default" | "success" | "warning" | "info" | "error";
  className?: string;
}

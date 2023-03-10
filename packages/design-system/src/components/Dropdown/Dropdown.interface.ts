import { ReactNode } from "react";

export interface DropdownProps {
  variant?: TDropdownVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  caption?: string;
}

type TDropdownVariant =
  | "default"
  | "person"
  | "checkbox-left"
  | "checkbox-right";

import { ReactNode } from "react";

export interface IDropdownOption {
  value: string;
  label: string;
  supportingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
export interface DropdownProps {
  options: IDropdownOption[];
  variant?: TDropdownVariant;
  supportingText?: string;
  isMulti?: boolean;
  skipMenuGap?: boolean;
}

export type TDropdownVariant =
  | "default"
  | "person"
  | "toggle"
  | "checkbox-left"
  | "checkbox-right"
  | "supporting-text";

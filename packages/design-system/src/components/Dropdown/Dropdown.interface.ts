import { ReactNode } from "react";

export interface IDropdownOption {
  value: string;
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
export interface DropdownProps {
  variant?: TDropdownVariant;
  caption?: string;
  isMulti?: boolean;
  options: IDropdownOption[];
}

type TDropdownVariant =
  | "default"
  | "person"
  | "checkbox-left"
  | "checkbox-right";

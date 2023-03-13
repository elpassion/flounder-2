import type { TIcon } from "../../helpers/types";
import { InputProps } from "../Input/Input.interface";

export interface DropdownProps {
  dropdownTitle?: string;
  dropdownItems: DropdownItemProps[];
  inputValue: string;
  isCreatable: boolean;
}

export interface DropdownListItemProps {
  label: string;
  value: string;
  icon?: TIcon;
}

export interface DropdownItemProps
  extends Omit<DropdownListItemProps, "inputValue"> {}

export interface InputAutocompleteProps
  extends Omit<DropdownProps, "inputValue">,
    Pick<InputProps, "placeholder"> {}

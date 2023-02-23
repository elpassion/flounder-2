import { IconTypes } from "utils/iconType";

type inputVariants =
  | "default"
  | "prefixText"
  | "prefixDropdown"
  | "prefixIcon"
  | "suffixDropdown";

export interface DropdownButtonProps {
  text: string;
  disabled?: boolean;
}

export interface TextProps {
  text: string;
  type: "label" | "supportingText" | "errorMessage";
  id?: string;
}

export interface IconProps {
  inputVariant: inputVariants;
  tooltipIcon?: IconTypes;
  isError?: boolean;
}

export interface PrefixProps {
  inputVariant?: inputVariants;
  prefixText: string;
  disabled?: boolean;
  prefixIcon?: IconTypes;
  isError?: boolean;
}

export interface SuffixProps {
  inputVariant?: inputVariants;
  suffixText: string;
  disabled?: boolean;
  isError?: boolean;
}

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  supportingText?: string;
  prefixOrSuffixText?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  inputType?: string;
  tooltipIcon?: IconTypes;
  prefixIcon?: IconTypes;
  inputVariant?: inputVariants;
  ariaLive?: "polite" | "assertive" | "off";
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaDescribedByError?: string;
}

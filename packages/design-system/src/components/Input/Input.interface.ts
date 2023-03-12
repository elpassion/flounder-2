import type { HTMLAttributes, PropsWithChildren } from "react";
import type { TIcon } from "../../helpers/types";

type suffixVariants = "dropdown";
type prefixVariants = "text" | "dropdown" | "icon";

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
  helpIcon?: TIcon;
  isError?: boolean;
  onIconClick?: () => void;
}
export interface PrefixProps {
  prefixText?: string;
  disabled?: boolean;
  prefixIcon?: TIcon;
  isError?: boolean;
  className?: string;
  prefixVariant?: prefixVariants;
}

export interface SuffixProps {
  suffixText: string;
  disabled?: boolean;
  isError?: boolean;
  className?: string;
  suffixVariant?: suffixVariants;
}

export interface BaseInputProps
  extends HTMLAttributes<HTMLInputElement>,
    PropsWithChildren,
    Omit<IconProps, "inputVariant"> {
  placeholder?: string;
  isError?: boolean;
  disabled?: boolean;
  required?: boolean;
  inputType?: string;
  suffixVariant?: suffixVariants;
  prefixVariant?: prefixVariants;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaDescribedByError?: string;
}

export interface InputProps
  extends Omit<BaseInputProps, "isError">,
    PrefixProps {
  label?: string;
  supportingText?: string;
  prefixOrSuffixText?: string;
  errorMessage?: string;
  inputType?: string;
  tooltipIcon?: TIcon;
  prefixIcon?: TIcon;
  ariaLive?: "polite" | "assertive" | "off";
}

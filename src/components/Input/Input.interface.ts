type inputVariants =
  | "default"
  | "prefixText"
  | "prefixDropdown"
  | "suffixDropdown";

export interface DropdownButtonProps {
  text: string;
  disabled?: boolean;
}

export interface TextProps {
  text: string;
  type: "label" | "supportingText" | "errorMessage";
}

export interface IconProps {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  isError?: boolean;
}

export interface PrefixTextProps {
  inputVariant?: inputVariants;
  prefixText: string;
  disabled?: boolean;
}

export interface SuffixProps {
  inputVariant?: inputVariants;
  suffixText: string;
  disabled?: boolean;
}

export interface InputProps extends PrefixTextProps, SuffixProps {
  label: string;
  placeholder?: string;
  supportingText?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  type?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

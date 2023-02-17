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
  tooltipIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  isError?: boolean;
}

export interface PrefixProps {
  inputVariant?: inputVariants;
  prefixText: string;
  disabled?: boolean;
  prefixIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface SuffixProps {
  inputVariant?: inputVariants;
  suffixText: string;
  disabled?: boolean;
}

export interface InputProps {
  label: string;
  placeholder?: string;
  supportingText?: string;
  prefixOrSuffixText?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  inputType?: string;
  tooltipIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  prefixIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  inputVariant?: inputVariants;
  ariaLive?: "polite" | "assertive" | "off";
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaDescribedByError?: string;
}

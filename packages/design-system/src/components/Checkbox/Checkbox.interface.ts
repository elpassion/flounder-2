export interface CheckboxProps {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  size?: "sm" | "md";
  labelText?: string;
  optionalLabelText?: string;
  supportingText?: string;
  labelPosition?: "left" | "right";
  onChange?: () => void;
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  labelClassName?: string;
}

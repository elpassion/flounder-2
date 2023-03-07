export interface RadioProps {
  name: string;
  id: string;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "md";
  labelText: string;
  supportingText: string;
  labelPosition?: "left" | "right";
  onChange?: () => void;
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

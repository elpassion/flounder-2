import classNames from "classnames";

import { IconTypes } from "utils/iconType";

export interface IconButtonProps {
  icon: IconTypes;
  variant?:
    | "primary"
    | "outlined"
    | "ghost"
    | "destructive"
    | "destructiveOutlined"
    | "destructiveGhost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = "primary",
  size = "md",
  disabled,
  onClick,
  className,
  ariaLabel,
}) => {
  const styleVariants = {
    primary:
      "border-primary-500 bg-primary-500 text-white hover:bg-primary-700 hover:border-primary-700 active:border-primary-800 active:bg-primary-800",
    outlined:
      "border-primary-500 bg-white text-primary-500 hover:border-primary-700 hover:text-primary-700 active:border-primary-800 active:text-primary-800",
    ghost:
      "border-transparent text-primary-500 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100 active:text-primary-800",
    destructive:
      "border-error-500 bg-error-500 text-white hover:bg-error-700 over:border-error-700 active:bg-error-800 active:border-error-800",
    destructiveGhost:
      "border-transparent text-error-500 hover:bg-error-50 hover:text-error-700 active:bg-error-100 active:text-error-800",
    destructiveOutlined:
      "border-error-500 bg-white text-error-500 hover:border-error-700 hover:text-error-700 active:border-error-800 active:text-error-800",
  };

  const sizeVariants = {
    sm: "p-2 w-8 h-8",
    md: "p-3 w-11 h-11",
    lg: "p-3 w-12 h-12",
  };

  const iconSizeVariants = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <button
      className={classNames(
        "w- flex items-center justify-center rounded-lg border",
        "hover:shadow-button",
        "disabled:border-neutral-100 disabled:bg-neutral-100 disabled:text-neutral-200 disabled:hover:shadow-none",
        styleVariants[variant],
        sizeVariants[size],
        className
      )}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span
        className={classNames("font-icons", iconSizeVariants[size])}
        dangerouslySetInnerHTML={{ __html: `${icon};` }}
      />
    </button>
  );
};

export default IconButton;

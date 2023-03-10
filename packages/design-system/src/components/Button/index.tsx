import classNames from "classnames";
import Icon from "../Icon";
import type { ButtonProps } from "./Button.interface";

export const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  size = "md",
  leftIcon,
  rightIcon,
  disabled,
  onClick,
  ariaLabel,
  className,
  isFluid,
  type = "button",
}) => {
  const styleVariants = {
    primary:
      "border-primary-500 bg-primary-500 text-white hover:bg-primary-700 hover:border-primary-700 active:border-primary-800 active:bg-primary-800",
    outlined:
      "border-primary-500 bg-white text-primary-500 hover:border-primary-700 hover:text-primary-700 active:border-primary-800 active:text-primary-800",
    ghost:
      "border-transparent text-primary-500 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100 active:text-primary-800",
    destructive:
      "border-error-500 bg-error-500 text-white hover:border-error-500 hover:bg-error-700 active:border-error-500 active:bg-error-800",
    destructiveGhost:
      "border-transparent text-error-500 hover:bg-error-50 hover:text-error-700 active:bg-error-100 active:text-error-800",
    destructiveOutlined:
      "border-error-500 bg-white text-error-500 hover:border-error-700 hover:text-error-700 active:border-error-800 active:text-error-800",
  };

  const sizeVariants = {
    sm: "h-8 gap-2 py-1.5 px-3.5 text-sm",
    md: "h-11 text-base py-2.5 px-4 gap-2",
    lg: "h-12 gap-4 py-2.5 px-4 text-lg",
  };

  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      className={classNames(
        "flex items-center justify-center whitespace-nowrap rounded-lg border ",
        "disabled:border-neutral-200 disabled:bg-neutral-200 disabled:text-white disabled:hover:shadow-none",
        "hover:shadow-button",
        styleVariants[variant],
        sizeVariants[size],
        { "w-full": isFluid },
        className
      )}
      type={type}
      onClick={onClick}
    >
      {leftIcon && (
        <div className="aspect-square h-5/6">
          <Icon customIcon={leftIcon} />
        </div>
      )}
      {text}
      {rightIcon && (
        <div className="aspect-square h-5/6">
          <Icon customIcon={rightIcon} />
        </div>
      )}
    </button>
  );
};

export default Button;

import classNames from "classnames";
import type { ButtonProps } from "./Button.interface";
import Icon from "../Icon";

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
      "border-button-primary bg-button-primary text-button-primary hover:bg-button-primary-hover hover:border-buttom-primary-hover active:border-buttom-primary-active active:bg-button-primary-active",
    outlined:
      "border-button-outlined bg-button-outlined text-button-outlined hover:border-button-outlined-hover hover:text-button-outlined-hover active:border-button-outlined-active active:border-button-outlined-active",
    ghost:
      "border-button-ghost bg-button-ghost text-button-ghost hover:bg-button-ghost-hover hover:text-button-ghost-hover active:bg-button-ghost-active active:text-button-ghost-active",
    destructive:
      "border-button-destructive bg-button-destructive text-button-destructive hover:border-button-destructive-hover hover:bg-button-destructive-hover active:border-button-destructive-active active:bg-button-destructive-active",
    destructiveGhost:
      "border-button-destructiveGhost text-button-destructiveGhost hover:bg-button-destructiveGhost-hover hover:text-button-destructiveGhost-hover active:bg-button-destructiveGhost-active active:text-button-destructiveGhost-active",
    destructiveOutlined:
      "border-button-destructiveOutlined bg-button-destructiveOutlined text-button-destructiveOutlined hover:border-button-destructiveOutlined-hover hover:text-button-destructiveOutlined-hover active:border-button-destructiveOutlined-active active:text-button-destructiveOutlined-active",
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
        "disabled:!border-button-disabled disabled:!bg-button-disabled disabled:!text-button-disabled disabled:hover:!shadow-none",
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

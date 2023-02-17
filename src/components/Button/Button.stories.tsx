import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";

import { IconTypes } from "utils/iconType";

export interface ButtonProps {
  text: string;
  variant:
    | "primary"
    | "outlined"
    | "ghost"
    | "destructive"
    | "destructiveGhost"
    | "destructiveOutlined";
  leftIcon?: IconTypes;
  rightIcon?: IconTypes;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export const Button: ComponentStory<React.FC<ButtonProps>> = ({
  text,
  variant,
  size = "md",
  leftIcon,
  rightIcon,
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

  const iconSizeVariants = {
    sm: "text-base",
    md: "text-base",
    lg: "text-2xl",
  };

  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      className={classNames(
        "flex items-center justify-center rounded-lg border",
        "disabled:border-neutral-200 disabled:bg-neutral-200 disabled:text-white disabled:hover:shadow-none",
        "hover:shadow-button",
        styleVariants[variant],
        sizeVariants[size],
        className
      )}
      onClick={onClick}
    >
      {!!leftIcon && (
        <span
          className={classNames("font-icons", iconSizeVariants[size])}
          dangerouslySetInnerHTML={{ __html: `${leftIcon};` }}
        />
      )}
      {text}
      {!!rightIcon && (
        <span
          className={classNames("font-icons", iconSizeVariants[size])}
          dangerouslySetInnerHTML={{ __html: `${rightIcon};` }}
        />
      )}
    </button>
  );
};

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    text: {
      description: "string",
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "outlined",
        "ghost",
        "destructive",
        "destructiveGhost",
        "destructiveOutlined",
      ],
      description:
        "primary | outlined | ghost | destructive | destructiveGhost | destructiveOutlined",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "sm | md | lg",
    },
    disabled: {
      description: "boolean",
    },
    leftIcon: {
      options: [undefined, "&#xea8a"],
      control: { type: "select", labels: { "&#xea8a": "slash" } },
      description: "icon",
    },
    rightIcon: {
      options: [undefined, "&#xea8a"],
      control: { type: "select", labels: { "&#xea8a": "slash" } },
      description: "icon",
    },
    onClick: {
      description: "function",
    },
    ariaLabel: {
      description: "string",
    },
  },
  args: {
    text: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
    rightIcon: undefined,
    leftIcon: undefined,
    ariaLabel: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2953%3A14621&t=rVpypypag1eT8SHD-0",
    },
  },
} as ComponentMeta<React.FC<ButtonProps>>;

import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";
import { IconProps } from "icons/Icons.interface";
import * as Icons from "icons/Slash";

export interface ButtonProps {
  text: string;
  variant: "primary" | "outlined" | "ghost" | "destructive" | "destructiveText";
  leftIcon?: React.FC<IconProps>;
  rightIcon?: React.FC<IconProps>;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onClick: () => void;
}

const icons = { undefined, Icons };

export const Button: ComponentStory<React.FC<ButtonProps>> = ({
  text,
  variant,
  size = "md",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  disabled,
  onClick,
}) => {
  const styleVariants = {
    primary:
      "border border-primary-500 bg-primary-500 text-white hover:bg-primary-700 hover:border-primary-700 active:border-primary-800 active:bg-primary-800",
    outlined:
      "border border-primary-500 bg-white text-primary-500 hover:border-primary-700 hover:text-primary-700 active:border-primary-800 active:text-primary-800",
    ghost:
      "text-primary-500 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100 active:text-primary-800",
    destructive:
      "bg-error-500 text-white hover:bg-error-700 active:bg-error-800",
    destructiveText:
      "text-error-500 hover:bg-error-50 hover:text-error-700 active:bg-error-100 active:text-error-800",
  };

  const sizeVariants = {
    sm: "gap-2 py-1.5 px-3.5 text-sm",
    md: "text-md gap-2",
    lg: "gap-4 text-lg",
  };

  const Icon = {
    sm: <Icons.SlashMD />,
    md: <Icons.SlashMD />,
    lg: <Icons.SlashLG />,
  };

  return (
    <button
      disabled={disabled}
      className={classNames(
        "flex items-center justify-center rounded-lg py-2.5 px-5",
        "disabled:border-neutral-200 disabled:bg-neutral-200 disabled:text-white disabled:hover:shadow-none",
        "hover:shadow-button",
        styleVariants[variant],
        sizeVariants[size]
      )}
      onClick={onClick}
    >
      {!!LeftIcon && <>{Icon[size]}</>}
      {text}
      {!!RightIcon && <>{Icon[size]}</>}
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
        "destructiveText",
      ],
      description: "primary | outlined | ghost | destructive | destructiveText",
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
      options: Object.keys(icons),
      mapping: icons,
      control: { type: "select", labels: { Icons: "slash" } },
      description: "icon",
    },
    rightIcon: {
      options: Object.keys(icons),
      mapping: icons,
      control: { type: "select", labels: { Icons: "slash" } },
      description: "icon",
    },
    onClick: {
      description: "function",
    },
  },
  args: {
    text: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2427%3A11063&t=21PNe6GxB9R5K2SQ-0",
    },
  },
} as ComponentMeta<React.FC<ButtonProps>>;

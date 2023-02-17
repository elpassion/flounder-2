import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";

import { ReactComponent as SlashIcon } from "icons/slash.svg";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  variant:
    | "primary"
    | "outlined"
    | "ghost"
    | "destructive"
    | "destructiveGhost"
    | "destructiveOutlined";
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const icons = { undefined, SlashIcon };

export const Button: ComponentStory<React.FC<ButtonProps>> = ({
  text,
  variant,
  size = "md",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  disabled,
  onClick,
  className,
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
    md: "h-11 text-md gap-2",
    lg: "h-12 gap-4 text-lg",
  };

  return (
    <button
      disabled={disabled}
      className={classNames(
        "flex items-center justify-center whitespace-nowrap rounded-lg border py-2.5 px-5",
        "disabled:border-neutral-200 disabled:bg-neutral-200 disabled:text-white disabled:hover:shadow-none",
        "hover:shadow-button",
        className,
        styleVariants[variant],
        sizeVariants[size]
      )}
      onClick={onClick}
    >
      {!!LeftIcon && (
        <>
          <LeftIcon height="100%" width="100%" />
        </>
      )}
      {text}
      {!!RightIcon && (
        <>
          <RightIcon height="100%" width="100%" />
        </>
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
      options: Object.keys(icons),
      mapping: icons,
      control: { type: "select", labels: { SlashIcon: "slash" } },
      description: "icon",
    },
    rightIcon: {
      options: Object.keys(icons),
      mapping: icons,
      control: { type: "select", labels: { SlashIcon: "slash" } },
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
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2953%3A14621&t=rVpypypag1eT8SHD-0",
    },
  },
} as ComponentMeta<React.FC<ButtonProps>>;

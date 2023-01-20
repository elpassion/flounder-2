import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";
import { IconProps } from "../../icons/Icons.interface";
import { SlashIcon } from "../../icons/slash";

export interface ButtonProps {
  text: string;
  variant:
    | "primary"
    | "outlined"
    | "ghost"
    | "destructive"
    | "destructive-text";
  leftIcon?: React.FC<IconProps>;
  rightIcon?: React.FC<IconProps>;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onClick: () => void;
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
}) => {
  const primaryStyle =
    variant === "primary" &&
    "border border-primary-500 bg-primary-500 text-white hover:bg-primary-700 active:bg-primary-800";
  const outlinedStyle =
    variant === "outlined" &&
    "border border-primary-500 bg-white text-primary-500 hover:border-primary-700 hover:text-primary-700 active:border-primary-800 active:text-primary-800";
  const ghostStyle =
    variant === "ghost" &&
    "text-primary-500 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100 active:text-primary-800";
  const destructiveStyle =
    variant === "destructive" &&
    "bg-error-500 text-white hover:bg-error-700 active:bg-error-800";
  const destructiveTextStyle =
    variant === "destructive-text" &&
    "text-error-500 hover:bg-error-50 hover:text-error-700 active:bg-error-100 active:text-error-800";

  return (
    <button
      disabled={disabled}
      className={classNames(
        "flex items-center justify-center rounded-lg py-2.5 px-5 hover:shadow-button disabled:border-neutral-200 disabled:bg-neutral-200 disabled:text-white disabled:hover:shadow-none",
        primaryStyle,
        outlinedStyle,
        ghostStyle,
        destructiveStyle,
        destructiveTextStyle,
        size === "sm" && "gap-2 py-1.5 px-3.5 text-sm",
        size === "md" && "text-md gap-2",
        size === "lg" && "gap-4 text-lg"
      )}
      onClick={onClick}
    >
      {!!LeftIcon && <LeftIcon size={size} />}
      {text}
      {!!RightIcon && <RightIcon size={size} />}
    </button>
  );
};

export default {
  title: "Button",
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
        "destructive-text",
      ],
      description:
        "primary | outlined | ghost | destructive | destructive-text",
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
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2427%3A11063&t=21PNe6GxB9R5K2SQ-0",
    },
  },
} as ComponentMeta<React.FC<ButtonProps>>;

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookIconControl } from "../utils";
import { Button as ButtonComponent } from "../../components/Button";
import type { ButtonProps } from "../../components/Button/Button.interface";

export const Button: ComponentStory<React.FC<ButtonProps>> = ({ ...props }) => (
  <ButtonComponent {...props} />
);

export default {
  title: "🟢 Atoms/Button",
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
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "button | submit | reset",
    },
    disabled: {
      description: "boolean",
    },
    isFluid: {
      description: "boolean",
    },
    leftIcon: storybookIconControl,
    rightIcon: storybookIconControl,
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
    type: "button",
    isFluid: false,
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

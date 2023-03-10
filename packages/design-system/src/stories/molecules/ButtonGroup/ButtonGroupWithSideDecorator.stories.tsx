import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import UserSvg from "../../../svgs/UserSvg";
import { ButtonGroupWithSideDecorator as ButtonGroupWithSideDecoratorComponent } from "../../../components/ButtonGroup/ButtonGroupWithSideDecorator";
import type { ButtonGroupProps } from "../../../components/ButtonGroup/ButtonGroup.interface";

export const ButtonGroupWithSideDecorator: ComponentStory<
  React.FC<ButtonGroupProps>
> = ({ ...props }) => <ButtonGroupWithSideDecoratorComponent {...props} />;

export default {
  title: "🟠 Molecules/ButtonGroup/ButtonGroupWithSideDecorator",
  component: ButtonGroupWithSideDecorator,
  argTypes: {
    buttons: {
      control: {
        type: "object",
        required: true,
      },
    },
    style: {
      control: {
        type: "select",
        options: ["withIcon", "withText"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["primary", "outlined", "ghost"],
      },
    },
  },
  args: {
    size: "md",
    style: "withIcon",
    variant: "primary",
    buttons: [
      {
        text: "Button 1",
        leftIcon: <UserSvg className="aspect-square w-full" />,
      },
      {
        text: "Button 1",
        leftIcon: <UserSvg className="aspect-square w-full" />,
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3307%3A20132&t=ZdZnKV3DB1YUpHBE-0",
    },
  },
} as ComponentMeta<React.FC<ButtonGroupProps>>;

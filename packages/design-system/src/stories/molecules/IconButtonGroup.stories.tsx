import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import UserSvg from "../../svgs/UserSvg";
import { IconButtonGroup as IconButtonGroupComponent } from "../../components/IconButtonGroup";
import type { IconButtonGroupProps } from "../../components/IconButtonGroup/IconButtonGroup.interface";

export const IconButtonGroup: ComponentStory<
  React.FC<IconButtonGroupProps>
> = ({ ...props }) => <IconButtonGroupComponent {...props} />;

export default {
  title: "🟢 Molecules/IconButtonGroup",
  component: IconButtonGroup,
  argTypes: {
    buttons: {
      control: {
        type: "object",
        required: true,
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
    variant: "primary",
    buttons: [
      {
        icon: <UserSvg />,
      },
      {
        icon: <UserSvg />,
      },
      {
        icon: <UserSvg />,
      },
      {
        icon: <UserSvg />,
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3307%3A20132&t=ZdZnKV3DB1YUpHBE-0",
    },
  },
} as ComponentMeta<React.FC<IconButtonGroupProps>>;

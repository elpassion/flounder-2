import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonGroup as ButtonGroupComponent } from "../../../components/ButtonGroup";
import UserSvg from "../../../svgs/UserSvg";
import Icon from "../../../components/Icon";
import type { ButtonGroupProps } from "../../../components/ButtonGroup/ButtonGroup.interface";

export const ButtonGroup: ComponentStory<React.FC<ButtonGroupProps>> = ({
  ...props
}) => <ButtonGroupComponent {...props} />;

export default {
  title: "🟠 Molecules/ButtonGroup",
  component: ButtonGroup,
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
        text: "Button 1",
        leftIcon: (
          <Icon customIcon={<UserSvg className="aspect-square w-full" />} />
        ),
      },
      {
        text: "Button 2",
        leftIcon: (
          <Icon customIcon={<UserSvg className="aspect-square w-full" />} />
        ),
      },
      {
        text: "Button 3",
        leftIcon: (
          <Icon customIcon={<UserSvg className="aspect-square w-full" />} />
        ),
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

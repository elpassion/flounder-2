import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonGroupProps } from "components/ButtonGroup/ButtonGroup.interface";
import { ButtonGroup as ButtonGroupComponent } from "components/ButtonGroup";

export const ButtonGroup: ComponentStory<React.FC<ButtonGroupProps>> = ({
  ...props
}) => <ButtonGroupComponent {...props} />;

export default {
  title: "Molecules/ButtonGroup",
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
    style: "default",
    size: "md",
    variant: "primary",
    buttons: [
      {
        text: "Button 1",
        leftIcon: "&#xea8a",
      },
      {
        text: "Button 2",
        leftIcon: "&#xea8a",
      },
      {
        text: "Button 3",
        leftIcon: "&#xea8a",
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

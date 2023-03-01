import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonGroupProps } from "../../../components/ButtonGroup/ButtonGroup.interface";
import { ButtonGroupWithSideDecorator as ButtonGroupWithSideDecoratorComponent } from "components/ButtonGroup/ButtonGroupWithSideDecorator";

export const ButtonGroupWithSideDecorator: ComponentStory<
  React.FC<ButtonGroupProps>
> = ({ ...props }) => <ButtonGroupWithSideDecoratorComponent {...props} />;

export default {
  title: "Molecules/ButtonGroup/ButtonGroupWithSideDecorator",
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
        leftIcon: "&#xea8a",
      },
      {
        text: "Button 1",
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

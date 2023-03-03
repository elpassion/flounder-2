import { IconButtonGroupProps } from "components/IconButtonGroup";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IconButtonGroup as IconButtonGroupComponent } from "components/IconButtonGroup";
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
        icon: "&#xea8a",
      },
      {
        icon: "&#xea8a",
      },
      {
        icon: "&#xea8a",
      },
      {
        icon: "&#xea8a",
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

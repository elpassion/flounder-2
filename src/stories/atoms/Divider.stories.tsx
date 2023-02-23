import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DividerProps } from "components/Divider";
import { Divider as DividerComponent } from "components/Divider";

export const Divider: ComponentStory<React.FC<DividerProps>> = ({
  ...props
}) => <DividerComponent {...props} />;

export default {
  title: "Atoms/Divider",
  component: Divider,
  argTypes: {
    labelText: {
      description: "string",
      type: { required: true, name: "string" },
    },
    type: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "horizontal | vertical",
    },
  },
  args: {
    labelText: "Label",
    type: "horizontal",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2691%3A16074&t=DuE9MGHwYmaApj8X-4",
    },
  },
} as ComponentMeta<React.FC<DividerProps>>;

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Toggle as ToggleComponent } from "components/Toggle";
import type { ToggleProps } from "components/Toggle/Toggle.interface";

export const Toggle: ComponentStory<React.FC<ToggleProps>> = ({ ...props }) => (
  <ToggleComponent {...props} />
);

export default {
  title: "🟢 Atoms/Toggle",
  component: Toggle,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "sm | md",
    },
    labelText: {
      description: "string",
    },
    supportingText: {
      description: "string",
    },
    disabled: {
      description: "boolean",
    },
    ariaLabel: {
      description: "string",
    },
  },
  args: {
    size: "md",
    labelText: "",
    supportingText: "",
    disabled: false,
    ariaLabel: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2757%3A14552&t=rVpypypag1eT8SHD-0",
    },
  },
} as ComponentMeta<React.FC<ToggleProps>>;

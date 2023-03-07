import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Textarea as TextareaComponent } from "components/Textarea";
import type { TextareaProps } from "components/Textarea/Textarea.interface";

export const Textarea: ComponentStory<React.FC<TextareaProps>> = ({
  ...props
}) => <TextareaComponent {...props} />;

export default {
  title: "🟠 Atoms/Textarea",
  component: Textarea,
  argTypes: {
    label: {
      name: "Label",
    },
    placeholder: {
      name: "Placeholder",
    },
    supportingText: {
      name: "Supporting Text",
    },
    disabled: {
      name: "Disabled",
    },
    error: {
      name: "Error",
      if: {
        arg: "disabled",
        eq: false,
      },
    },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    supportingText: "Supporting Text",
    disabled: false,
    error: false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3766%3A29784&t=g7Z8gn261nJ9WobI-0",
    },
  },
} as ComponentMeta<React.FC<TextareaProps>>;

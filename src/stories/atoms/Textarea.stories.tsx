import {
  Textarea as TextareaComponent,
  TextareaProps,
} from "components/Textarea";
import { ComponentStory } from "@storybook/react";
export const Textarea: ComponentStory<React.FC<TextareaProps>> = ({
  ...props
}) => <TextareaComponent {...props} />;

export default {
  title: "Atoms/Textarea",
  component: Textarea,
  argTypes: {
    label: {
      description: "Label",
    },
    showLabel: {
      description: "Show Label",
    },
    placeholder: {
      description: "Placeholder",
    },
    supportingText: {
      description: "Supporting Text",
    },
    disabled: {
      description: "Disabled",
    },
    destructive: {
      description: "Destructive",
      if: {
        arg: "disabled",
        eq: false,
      },
    },
  },
  args: {
    label: "Label",
    showLabel: true,
    placeholder: "Placeholder",
    supportingText: "Supporting Text",
    showSupportingText: true,
    disabled: false,
    destructive: false,
  },
};

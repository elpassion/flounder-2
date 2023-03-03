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
};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { Checkbox as CheckboxComponent } from "components/Checkbox";
import type { CheckboxProps } from "components/Checkbox";

const docs: string = `# Usage <br/> 
| DO | DON’T |
| ----------- | ----------- |
| Use checkboxes when the user can select more than one option. | Don't use checkboxes for a group of items where the user can select only a single option. Instead, use radio buttons. |
| Checkboxes let users select one or more options from a list. A parent checkbox allows for easy selection or deselection of all items. | If a list consists of multiple options, don't use switches. Instead, use checkboxes. Checkboxes imply the items are related, and take up less visual space. |`;

export const Checkbox: ComponentStory<React.FC<CheckboxProps>> = ({
  ...props
}) => <CheckboxComponent {...props} />;

export default {
  title: "🟢 Atoms/Checkbox",
  component: Checkbox,
  argTypes: {
    name: {
      description: "string",
    },
    labelText: {
      description: "string",
    },
    optionalLabelText: {
      description: "string",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
      description: "left | right",
    },
    supportingText: {
      description: "string",
    },
    checked: {
      description: "boolean",
    },
    required: {
      description: "boolean",
    },
    disabled: {
      description: "boolean",
    },
    error: {
      description: "boolean",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "sm | md",
    },
    onChange: {
      description: "function",
    },
    ariaLabel: {
      description: "string",
    },
  },
  args: {
    name: "withSupportingText",
    labelText: "Don't show again",
    optionalLabelText: "(optional)",
    labelPosition: "right",
    supportingText: "Save my login details for next time.",
    checked: false,
    required: false,
    disabled: false,
    error: false,
    size: "md",
    onChange: undefined,
    ariaLabel: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3100%3A17682&t=rVpypypag1eT8SHD-0",
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Description markdown={docs} />
        </>
      ),
    },
  },
} as ComponentMeta<React.FC<CheckboxProps>>;

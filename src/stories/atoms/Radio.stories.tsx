import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { Radio as RadioComponent } from "components/Radio";
import type { RadioProps } from "components/Radio/Radio.interface";

const docs: string = `# Usage <br/> 
| DO | DON’T |
| ----------- | ----------- |
| Use radio buttons to select a single item from a small set of options. | Don't use radio buttons to select from a long list of options. Dropdown menu is a better choice in such case. |
| Use labels that are short, direct, unambiguous and unchanging. | Do not mix radio buttons and checkboxes in a single selection. |
| Avoid offering more than 5 options. | |
| Capitalise the label, do not use full stops. | |
| For items with descriptions, the latter should be capitalised and end with a full stop. Keep the descriptions as short as possible (single-line description is ideal). Otherwise, consider other options of conveying the information, such as intro text or a message box. | |
| If a text label overflows its container, it should be wrapped. Avoid labels wrapping into more than 2 lines. | |`;

export const Radio: ComponentStory<React.FC<RadioProps>> = ({ ...props }) => (
  <RadioComponent {...props} />
);

export default {
  title: "🟢 Atoms/Radio",
  component: Radio,
  argTypes: {
    id: {
      description: "string",
    },
    name: {
      description: "string",
    },
    labelText: {
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
    id: "withSupportingText",
    name: "firstRadioGroup",
    labelText: "Don't show again",
    labelPosition: "right",
    supportingText: "Save my login details for next time.",
    checked: false,
    disabled: false,
    error: false,
    size: "md",
    onChange: undefined,
    ariaLabel: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2333%3A11688&t=21PNe6GxB9R5K2SQ-0",
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
} as ComponentMeta<React.FC<RadioProps>>;

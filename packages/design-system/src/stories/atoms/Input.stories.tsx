import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { Input as InputComponent } from "../../components/Input";
import type { InputProps } from "../../components/Input/Input.interface";
import { storybookIconControl } from "../utils";

const docs: string = `# Usage <br/> 
| DO | <div style="width:20vw">DON’T</div> |
| ----------- | ----------- |
|Place labels directly above the input, and align to the left.| |
|For helper text provide an example or specific syntax for the input, rather than in the input area, so that it's visible after text has been entered. Only use this where clarification is required, and try not to overuse it.| |
|Field label text above the input area should be short and concise.| |`;

export const Input: ComponentStory<React.FC<InputProps>> = ({ ...props }) => (
  <InputComponent {...props} />
);

export default {
  title: "🟢 Atoms/Input",
  component: Input,
  argTypes: {
    label: {
      description: "string",
      type: { required: true, name: "string" },
    },
    placeholder: {
      description: "string",
    },
    supportingText: {
      description: "string",
    },
    disabled: {
      description: "boolean",
    },
    errorMessage: {
      description: "string",
    },
    suffixVariant: {
      control: "select",
      options: [undefined, "dropdown"],
      description: "dropdown",
    },
    prefixVariant: {
      control: "select",
      options: [undefined, "text", "dropdown", "icon"],
      description: "text | dropdown | icon",
    },
    prefixOrSuffixText: {
      description: "string",
    },
    inputType: {
      control: "select",
      options: ["text", "number", "email", "password"],
      description: "only examples: text | number | email | password",
    },
    tooltipIcon: storybookIconControl,
    prefixIcon: storybookIconControl,
    ariaLive: {
      control: "select",
      options: ["polite", "assertive", "off"],
      description: "polite | assertive | off",
    },
    ariaLabel: { description: "string" },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    supportingText: "Write here some tips",
    disabled: false,
    errorMessage: "",
    suffixVariant: undefined,
    prefixVariant: undefined,
    prefixOrSuffixText: "https://",
    tooltipIcon: undefined,
    prefixIcon: undefined,
    inputType: "text",
    type: "text",
    ariaLive: "polite",
    ariaLabel: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2691%3A17978&t=zWSgI9j4IBnJou8M-0",
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
} as ComponentMeta<React.FC<InputProps>>;

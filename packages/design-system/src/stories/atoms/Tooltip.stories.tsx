import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  Description,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { Tooltip as TooltipComponent } from "../../components/Tooltip";
import type { TooltipProps } from "../../components/Tooltip/Tooltip.interface";

const docs: string = `# Usage <br/> 
| DO  | DON’T |
| ----------- | ----------- |
|consistently provide tooltips for unlabeled icons | Don't provide tooltips for only a subset of icons within a set |
avoid using tooltips when actions are clearly defined | Don't provide redundant information with a tooltip |`;

export const Tooltip: ComponentStory<React.FC<TooltipProps>> = ({
  ...props
}) => <TooltipComponent {...props} />;

export default {
  title: "🟢 Atoms/Tooltip",
  component: Tooltip,
  argTypes: {
    text: {
      description: "string",
    },
    supportingText: {
      description: "string",
    },
    position: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "top | right | bottom | left",
    },
    variant: {
      control: "select",
      options: ["white", "dark"],
      description: "white | dark",
    },
  },
  args: {
    text: "Tooltip text",
    supportingText: "Supporting text for user",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2972%3A14840&t=rVpypypag1eT8SHD-0",
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
} as ComponentMeta<React.FC<TooltipProps>>;

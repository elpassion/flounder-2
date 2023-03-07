import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Indicator as IndicatorComponent } from "components/Indicator";
import type { IndicatorProps } from "components/Indicator/Indicator.interface";

export const Indicator: ComponentStory<React.FC<IndicatorProps>> = ({
  ...props
}) => <IndicatorComponent {...props} />;

export default {
  title: "🟢 Atoms/Indicator",
  component: Indicator,
  argTypes: {
    type: {
      control: "select",
      options: ["error", "warning", "processing", "success", "default"],
    },
    variant: {
      control: "select",
      options: ["default", "count", "badge"],
    },
    text: {
      control: "text",
    },
    number: {
      control: "number",
    },
  },
  args: {
    variant: "count",
    number: 1,
    text: "Indicator",
    type: "default",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2691%3A16074&t=DuE9MGHwYmaApj8X-4",
    },
  },
} as ComponentMeta<React.FC<IndicatorProps>>;

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LinearProgressBarProps } from "components/ProgressBar/LinearProgressBar/LinearProgressBar.interface";
import { LinearProgressBar as LinearProgressBarComponent } from "components/ProgressBar/LinearProgressBar";

export const LinearProgressBar: ComponentStory<
  React.FC<LinearProgressBarProps>
> = ({ ...props }) => <LinearProgressBarComponent {...props} />;

export default {
  title: "🟢 Atoms/ProgressBar/LinearProgressBar",
  component: LinearProgressBar,
  argTypes: {
    value: {
      control: {
        type: "range",
        min: 0,
        max: 100,
      },
    },
    label: {
      control: {
        type: "select",
        options: ["none", "right", "bottom", "topFloating", "bottomFloating"],
      },
    },
  },
  args: {
    value: 50,
    label: "none",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3307%3A19117&t=OGq5t8JbqSEpLufw-0",
    },
  },
} as ComponentMeta<React.FC<LinearProgressBarProps>>;

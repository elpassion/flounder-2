import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CircularProgressBar as CircularProgressBarComponent } from "../../../components/ProgressBar/CircularProgressBar";
import type { CircularProgressBarProps } from "../../../components/ProgressBar/CircularProgressBar/CircularProgressBar.interface";

export const CircularProgressBar: ComponentStory<
  React.FC<CircularProgressBarProps>
> = ({ ...props }) => <CircularProgressBarComponent {...props} />;

export default {
  title: "🟢 Atoms/ProgressBar/CircularProgressBar",
  component: CircularProgressBar,
  argTypes: {
    size: {
      options: ["sm", "lg"],
      control: {
        type: "select",
      },
    },
    labelPosition: {
      options: ["none", "inside", "outside"],
      control: {
        type: "select",
      },
      if: {
        arg: "size",
        eq: "lg",
      },
    },
    label: {
      control: {
        type: "text",
      },
      if: {
        arg: "size",
        eq: "lg",
      },
    },
    progress: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
        required: true,
      },
    },
  },
  args: {
    progress: 60,
    size: "sm",
    label: "Progress label",
    labelPosition: "none",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3766%3A29805&t=g7Z8gn261nJ9WobI-0",
    },
  },
} as ComponentMeta<React.FC<CircularProgressBarProps>>;

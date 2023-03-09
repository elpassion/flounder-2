import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Chips as ChipsComponent } from "../../components/Chips";
import type { ChipsProps } from "../../components/Chips/Chips.interface";

export const Chips: ComponentStory<React.FC<ChipsProps>> = ({ ...props }) => (
  <ChipsComponent {...props} />
);

export default {
  title: "🟠 Atoms/Chips",
  component: Chips,
  argTypes: {
    text: {
      description: "Enabled",
    },
    suffixIcon: {
      options: ["&#xeaf4", "&#xea65", undefined],
      control: {
        type: "select",
        labels: {
          "&#xeaf4": "bookmark",
          "&#xea65": "trash",
        },
      },
      type: { required: true, name: "string" },
      description: "icon",
    },
    prefixIcon: {
      options: ["&#xeaf4", "&#xea65", undefined],
      control: {
        type: "select",
        labels: {
          "&#xeaf4": "bookmark",
          "&#xea65": "trash",
        },
      },
      type: { required: true, name: "string" },
      description: "icon",
    },
  },
  args: {
    text: "Enabled",
    suffixIcon: undefined,
    prefixIcon: undefined,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2225%3A6724&t=MVA9T40duNaxfbWE-0",
    },
  },
} as ComponentMeta<React.FC<ChipsProps>>;

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChipProps } from "../../components/Chips";
import { Chip as ChipComponent } from "../../components/Chips";

export const Chip: ComponentStory<React.FC<ChipProps>> = ({ ...props }) => (
  <ChipComponent {...props} />
);

export default {
  title: "Atoms/Chip",
  component: Chip,
  argTypes: {
    text: {
      description: "Enabled",
    },
    suffixIcon: {
      options: ["&#xeaf4", "&#xea65"],
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
      options: ["&#xeaf4", "&#xea65"],
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
    suffixIcon: "&#xeaf4",
    prefixIcon: "&#xea65",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2225%3A6724&t=MVA9T40duNaxfbWE-0",
    },
  },
} as ComponentMeta<React.FC<ChipProps>>;

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Badge as BadgeComponent } from "components/Badge";
import type { BadgeProps } from "components/Badge/Badge.interface";

export const Badge: ComponentStory<React.FC<BadgeProps>> = ({ ...props }) => (
  <BadgeComponent {...props} />
);

export default {
  title: "🟢 Atoms/Badge",
  component: Badge,
  argTypes: {
    text: {
      description: "string",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["filled", "outline"],
    },
  },
  args: {
    text: "Badge",
    size: "md",
    variant: "filled",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3608%3A22989&t=M2SScZpjMjPr5j2q-0",
    },
  },
} as ComponentMeta<React.FC<BadgeProps>>;

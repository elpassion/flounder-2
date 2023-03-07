import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Anchor as AnchorComponent } from "components/Anchor";
import type { AnchorProps} from "components/Anchor";

export const Anchor: ComponentStory<React.FC<AnchorProps>> = ({ ...props }) => (
  <AnchorComponent {...props} />
);

export default {
  title: "🟢 Atoms/Anchor",
  component: Anchor,
  argTypes: {
    text: {
      description: "string",
      type: { required: true, name: "string" },
    },
    link: {
      description: "string",
      type: { required: true, name: "string" },
    },
    decoration: {
      control: "select",
      options: ["none", "bottom", "left"],
      description: "none | bottom | left",
    },
    role: {
      description: "string",
    },
  },
  args: {
    text: "Anchor item",
    link: "https://www.elpassion.com/",
    decoration: "none",
    role: "menuItem",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2894%3A12114&t=rVpypypag1eT8SHD-0",
    },
  },
} as ComponentMeta<React.FC<AnchorProps>>;

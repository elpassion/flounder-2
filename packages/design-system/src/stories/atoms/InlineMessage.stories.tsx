import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InlineMessage as InlineMessageComponents } from "../../components/InlineMessage";
import { storybookIconControl } from "../utils";
import type { InlineMessageProps } from "../../components/InlineMessage/InlineMessage.interface";

export const InlineMessage: ComponentStory<React.FC<InlineMessageProps>> = ({
  ...props
}) => <InlineMessageComponents {...props} />;

export default {
  title: "🟢 Atoms/InlineMessage",
  component: InlineMessage,
  argTypes: {
    text: {
      description: "string",
      type: { required: true, name: "string" },
    },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "info", "error"],
      description: "default | success | warning | info | error",
    },
    icon: storybookIconControl,
  },
  args: {
    text: "This is default message - check it out!",
    variant: "default",
    icon: undefined,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2830%3A14309&t=wfQIehNzi01pCu8N-0",
    },
  },
} as ComponentMeta<React.FC<InlineMessageProps>>;

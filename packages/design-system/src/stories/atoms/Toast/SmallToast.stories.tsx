import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { SmallToast as SmallToastComponent } from "../../../components/Toast/SmallToast";
import type { ToastProps } from "../../../components/Toast/Toast.interface";

const docs: string = `# Usage <br/> 
| DO | DON’T |
| ----------- | ----------- |
|**Toast should:**<br/> • Be used for short messages to confirm an action<br/> • Not go over 3 words<br/> • Rarely be used for error messages | **Use better action label than:**<br/> • OK<br/> • Got it<br/> • Cancel product<br/> • Dismiss - the [X] to dismiss is already included in the component.
| **When to use:**<br/> • For success messages | | 
| **Toast messages should be:**<br/> • Short and affirmative<br/> • Written in the pattern of: noun + verb | | 
| **Use for :**<br/> • Collection added<br/> • Product updated<br/> • Customer updated<br/> • Internet disconnected<br/> • Connection timed out | |`;

export const SmallToast: ComponentStory<React.FC<ToastProps>> = ({
  ...props
}) => <SmallToastComponent {...props} />;

export default {
  title: "🟠 Atoms/Toast/SmallToast",
  component: SmallToast,
  argTypes: {
    title: {
      description: "string",
    },
    description: {
      description: "string",
    },
    icon: {
      options: [undefined, "&#xea64", "&#xea62", "&#xeb19"],
      control: {
        type: "select",
        labels: { "&#xea62": "info", "&#xea64": "inbox", "&#xeb19": "alert" },
      },
      description: "icon",
    },
    firstActionText: {
      description: "string",
    },
    secondActionText: {
      description: "string",
    },
    sectionVariants: {
      control: "select",
      options: [undefined, "close"],
      description: "close",
    },
    backgroundColor: {
      control: {
        type: "select",
        options: ["bg-neutral-700", "bg-primary-500", "bg-error-600"],
        labels: {
          "bg-neutral-700": "neutral",
          "bg-primary-500": "positive",
          "bg-error-600": "destructive",
        },
      },
      description: "color variant",
    },
  },
  args: {
    title: "Alert title",
    description: "Alert description alert description",
    icon: "&#xea62",
    firstActionText: "Action",
    secondActionText: "Action",
    backgroundColor: "bg-neutral-700",
    sectionVariants: "close",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2647%3A13217&t=NrE8VldzyOFwUloa-0",
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
} as ComponentMeta<React.FC<ToastProps>>;

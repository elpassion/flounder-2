import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { ToastProps } from "components/Toast/Toast.interface";
import { Toast as ToastComponent } from "components/Toast/Toast";

const docs: string = `# Usage <br/> 
| DO | DON’T |
| ----------- | ----------- |
|**Toast should:**<br/> • Be used for short messages to confirm an action<br/> • Not go over 3 words<br/> • Rarely be used for error messages | **Use better action label than:**<br/> • OK<br/> • Got it<br/> • Cancel product<br/> • Dismiss - the [X] to dismiss is already included in the component.
| **When to use:**<br/> • For success messages | | 
| **Toast messages should be:**<br/> • Short and affirmative<br/> • Written in the pattern of: noun + verb | | 
| **Use for :**<br/> • Collection added<br/> • Product updated<br/> • Customer updated<br/> • Internet disconnected<br/> • Connection timed out | |`;

export const Toast: ComponentStory<React.FC<ToastProps>> = ({ ...props }) => (
  <ToastComponent {...props} />
);

export default {
  title: "Atoms/Toast",
  component: Toast,
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
    sectionVariants: {
      control: "select",
      options: [undefined, "close", "action"],
      description: "close | action",
    },
    firstActionText: {
      description: "string",
    },
    secondActionText: {
      description: "string",
    },
  },
  args: {
    title: "Alert title",
    description: "Alert description alert description",
    icon: "&#xea62",
    sectionVariants: "action",
    firstActionText: "Action",
    secondActionText: "Action",
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

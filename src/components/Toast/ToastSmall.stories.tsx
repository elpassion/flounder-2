import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";
import {
  Title,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import {
  ActionToastProps,
  BaseSmallToastProps,
  CloseButtonProps,
  IconToastProps,
  TextToastProps,
  ToastProps,
} from "./Toast.interface";
import { ReactComponent as CloseIcon } from "icons/close.svg";
import { ReactComponent as InboxIcon } from "icons/inbox.svg";
import { ReactComponent as InfoIcon } from "icons/info.svg";
import { ReactComponent as AlertIcon } from "icons/alert-triangle.svg";

const icons = { undefined, InboxIcon, InfoIcon, AlertIcon };

const docs: string = `# Usage <br/> 
| DO | DON’T |
| ----------- | ----------- |
|**Toast should:**<br/> • Be used for short messages to confirm an action<br/> • Not go over 3 words<br/> • Rarely be used for error messages | **Use better action label than:**<br/> • OK<br/> • Got it<br/> • Cancel product<br/> • Dismiss - the [X] to dismiss is already included in the component.
| **When to use:**<br/> • For success messages | | 
| **Toast messages should be:**<br/> • Short and affirmative<br/> • Written in the pattern of: noun + verb | | 
| **Use for :**<br/> • Collection added<br/> • Product updated<br/> • Customer updated<br/> • Internet disconnected<br/> • Connection timed out | |`;

export const ToastSmall: ComponentStory<React.FC<ToastProps>> = ({
  title,
  description,
  icon,
  firstActionText,
  secondActionText,
  ...props
}) => {
  const iconSize = 22;
  const Toast = {
    BaseSmallToast: ({
      children,
      backgroundColor,
      sectionVariants,
      onClose,
      className,
    }: BaseSmallToastProps) => {
      return (
        <div
          className={classNames(
            "flex w-max min-w-[280px] max-w-xs gap-2 rounded-lg py-3.5 pl-4 text-white shadow-xl",
            sectionVariants === "close"
              ? "justify-between pr-2"
              : "justify-center pr-4",
            backgroundColor,
            className
          )}
        >
          <div className="flex gap-2">{children}</div>

          {sectionVariants === "close" && (
            <Toast.CloseButton onClose={onClose} />
          )}
        </div>
      );
    },
    Text: ({ children, textType }: TextToastProps) => {
      const textTypeVariants = {
        title: "text-sm font-medium",
        description: "text-xs font-normal",
      };

      return (
        <p className={textTypeVariants[textType]}>
          {children}
        </p>
      );
    },
    Icon: ({ icon: Icon }: IconToastProps) => (
      <div className={`w-[${iconSize}px]`}>
        <Icon height={iconSize} width={iconSize} />
      </div>
    ),
    Action: ({ children, onClick }: ActionToastProps) => {
      return (
        <button
          className="w-fit text-sm underline"
          onClick={onClick}
        >
          {children}
        </button>
      );
    },
    CloseButton: ({ onClose }: CloseButtonProps) => {
      return (
        <button onClick={onClose} aria-label="close">
          <CloseIcon focusable="false"/>
        </button>
      );
    },
  };

  return (
    <Toast.BaseSmallToast {...props}>
      {icon && <Toast.Icon icon={icon} />}
      <div className="flex flex-col">
        {title && (
          <div className="flex gap-4">
            <Toast.Text textType="title">{title}</Toast.Text>

            {firstActionText && <Toast.Action>{firstActionText}</Toast.Action>}
            {secondActionText && (
              <Toast.Action>{secondActionText}</Toast.Action>
            )}
          </div>
        )}
        <Toast.Text textType="description">{description}</Toast.Text>
      </div>
    </Toast.BaseSmallToast>
  );
};

export default {
  title: "Atoms/Toast/ToastSmall",
  component: ToastSmall,
  argTypes: {
    title: {
      description: "string",
    },
    description: {
      description: "string",
    },
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: "select",
        labels: { InfoIcon: "info", InboxIcon: "inbox", AlertIcon: "alert" },
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
    icon: InfoIcon,
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

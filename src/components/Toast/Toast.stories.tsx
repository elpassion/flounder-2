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
  ActionSectionProps,
  ActionToastProps,
  BaseToastProps,
  CloseButtonProps,
  CloseSectionProps,
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

export const Toast: ComponentStory<React.FC<ToastProps>> = ({
  title,
  description,
  icon,
  firstActionText,
  secondActionText,
  ...props
}) => {
  const iconSize = 22;
  const Toast = {
    BaseToast: ({
      children,
      sectionVariants,
      ...props
    }: BaseToastProps) => {
      return (
        <div
          className={classNames(
            "grid w-full max-w-md grid-cols-[1fr_auto] rounded-lg bg-white text-neutral-500 shadow-xl"
          )}
        >
          <div className="flex gap-2 px-4 py-5">{children}</div>
          {sectionVariants === "action" && <Toast.ActionsSection {...props} />}
          {sectionVariants === "close" && (
            <Toast.CloseButtonSection {...props} />
          )}
        </div>
      );
    },
    Text: ({ children, textType }: TextToastProps) => {
      const textTypeVariants = {
        title: "text-sm font-medium text-primary-500",
        description: "text-xs font-normal",
      };

      return (
        <p className={classNames(textTypeVariants[textType])}>{children}</p>
      );
    },
    Icon: ({ icon: Icon }: IconToastProps) => (
      <Icon
        height={iconSize}
        width={iconSize}
        className={`min-w-[${iconSize}px]`}
      />
    ),
    CloseButton: ({ onClose }: CloseButtonProps) => (
      <button onClick={onClose}>
        <CloseIcon />
      </button>
    ),
    Action: ({ children, className, onClick }: ActionToastProps) => {
      return (
        <button
          className={classNames(
            "w-fit flex-1 border-l border-neutral-100 px-6 text-sm [&:nth-child(2)]:border-t",
            className
          )}
          onClick={onClick}
        >
          {children}
        </button>
      );
    },
    ActionsSection: ({
      firstActionText,
      secondActionText,
    }: ActionSectionProps) => {
      return (
        <>
          <div className="flex h-full flex-col">
            {firstActionText && (
              <Toast.Action
                className="text-primary-500 hover:text-primary-600"
                {...props}
              >
                {firstActionText}
              </Toast.Action>
            )}
            {secondActionText && (
              <Toast.Action className="hover:text-neutral-600" {...props}>
                {secondActionText}
              </Toast.Action>
            )}
          </div>
        </>
      );
    },
    CloseButtonSection: ({ onClose }: CloseSectionProps) => {
      return (
        <div className="p-2">
          <Toast.CloseButton onClose={onClose} />
        </div>
      );
    },
  };

  return (
    <Toast.BaseToast
      firstActionText={firstActionText}
      secondActionText={secondActionText}
      {...props}
    >
      {icon && <Toast.Icon icon={icon} />}
      <div className="flex flex-col">
        {title && (
          <div className="flex gap-4">
            <Toast.Text textType="title">{title}</Toast.Text>
          </div>
        )}
        <Toast.Text textType="description">{description}</Toast.Text>
      </div>
    </Toast.BaseToast>
  );
};

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
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: "select",
        labels: { InfoIcon: "info", InboxIcon: "inbox", AlertIcon: "alert" },
      },
      description: "icon",
    },
    sectionVariants: {
      control: "select",
      options: [undefined , "close", "action"],
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
    icon: InfoIcon,
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

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
  variant,
  firstActionText,
  secondActionText,
  ...props
}) => {
  const Toast = {
    BaseToast: ({
      children,
      variant,
      sectionVariants,
      backgroundColor,
      ...props
    }: BaseToastProps) => {
      const toastVariants = {
        default: "max-w-md bg-white text-neutral-500",
        small: `max-w-max min-w-[280px] text-white ${backgroundColor}`,
      };

      return (
        <div
          className={classNames(
            "grid w-full grid-cols-[1fr_auto] rounded-lg shadow-xl",
            toastVariants[variant]
          )}
        >
          <div className="flex gap-2 px-4 py-5">{children}</div>
          {sectionVariants === "action" && (
            <Toast.ActionsSection variant={variant} {...props} />
          )}
          {sectionVariants === "close" && (
            <Toast.CloseButtonSection variant={variant} {...props}/>
          )}
        </div>
      );
    },
    Text: ({ children, textType, variant }: TextToastProps) => {
      const textTypeVariants = {
        title: `text-sm font-medium ${
          variant === "default" && "text-primary-500"
        }`,
        description: "text-xs font-normal",
      };

      return (
        <p className={classNames(textTypeVariants[textType])}>{children}</p>
      );
    },
    Icon: ({ icon: Icon }: IconToastProps) => <Icon className="min-w-max" />,
    CloseButton: ({ onClose }: CloseButtonProps) => (
      <button onClick={onClose}>
        <CloseIcon />
      </button>
    ),
    Action: ({ children, variant, onClick }: ActionToastProps) => {
      const actionVariants = {
        default:
          "flex-1 border-l border-neutral-100 [&:nth-child(2)]:border-t px-6 hover:text-primary-500",
        small: "underline",
      };
      return (
        <button
          className={classNames("w-fit text-sm", actionVariants[variant])}
          onClick={onClick}
        >
          {children}
        </button>
      );
    },
    ActionsSection: ({
      firstActionText,
      secondActionText,
      variant,
    }: ActionSectionProps) => {
      return (
        <>
          {variant === "default" && (
            <div className="flex h-full flex-col">
              {firstActionText && (
                <Toast.Action variant={variant} {...props}>
                  {firstActionText}
                </Toast.Action>
              )}
              {secondActionText && (
                <Toast.Action variant={variant} {...props}>
                  {secondActionText}
                </Toast.Action>
              )}
            </div>
          )}
        </>
      );
    },
    CloseButtonSection: ({ variant, onClose }: CloseSectionProps) => {
      return (
        <div
          className={classNames(
            "p-2",
            variant === "small" && "flex justify-center"
          )}
        >
          <Toast.CloseButton onClose={onClose}/>
        </div>
      );
    },
  };

  return (
    <Toast.BaseToast
      variant={variant}
      firstActionText={firstActionText}
      secondActionText={secondActionText}
      {...props}
    >
      {icon && <Toast.Icon icon={icon} />}
      <div className="flex flex-col">
        {title && (
          <div className="flex gap-4">
            <Toast.Text variant={variant} textType="title">
              {title}
            </Toast.Text>
            {variant === "small" && (
              <>
                {firstActionText && (
                  <Toast.Action variant={variant}>
                    {firstActionText}
                  </Toast.Action>
                )}
                {secondActionText && (
                  <Toast.Action variant={variant}>
                    {secondActionText}
                  </Toast.Action>
                )}
              </>
            )}
          </div>
        )}
        <Toast.Text variant={variant} textType="description">
          {description}
        </Toast.Text>
      </div>
    </Toast.BaseToast>
  );
};

export default {
  title: "Toast",
  component: Toast,
  argTypes: {
    title: {
      description: "string",
    },
    description: {
      description: "string",
    },
    variant: {
      control: "select",
      options: ["default", "small"],
      description: "default | small",
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
      options: ["close", "action"],
      description: "close | action",
    },
    firstActionText: {
      description: "string",
    },
    secondActionText: {
      description: "string",
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
    variant: "default",
    icon: InfoIcon,
    sectionVariants: "action",
    firstActionText: "Action",
    secondActionText: "Action",
    backgroundColor: "bg-neutral-700",
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

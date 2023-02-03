import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";

import { ReactComponent as BellIcon } from "icons/bell.svg";
import { ReactComponent as AlertIcon } from "icons/alert-triangle.svg";
import { ReactComponent as InfoIcon } from "icons/info.svg";
import { ReactComponent as CheckIcon } from "icons/check-square.svg";

const icons = { BellIcon, AlertIcon, InfoIcon, CheckIcon };

interface InlineMessageProps {
  icon?: React.FC;
  text: string;
  variant?: "default" | "success" | "warning" | "info" | "error";
}

export const InlineMessage: ComponentStory<React.FC<InlineMessageProps>> = ({
  text,
  icon: Icon = BellIcon,
  variant = "default",
}) => {
  const iconSize = 24
  const inlineMessageStyleVariants = {
    default: "bg-neutral-50 text-neutral-900",
    success: "bg-primary-100 text-primary-900",
    warning: "bg-orange-100 text-orange-900",
    info: "bg-blue-100 text-blue-900",
    error: "bg-error-100 text-900",
  };

  const iconColorVariants = {
    default: "text-neutral-900",
    success: "text-primary-500",
    warning: "text-orange-500",
    info: "text-blue-500",
    error: "text-error-500",
  };

  return (
    <div
      className={classNames(
        "flex items-center gap-2 rounded-lg p-3",
        inlineMessageStyleVariants[variant]
      )}
    >
      <span className={iconColorVariants[variant]} >
      <Icon height={iconSize} width={iconSize}/>
      </span>
      <p>{text}</p>
    </div>
  );
};

export default {
  title: "Atoms/InlineMessage",
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
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: "select",
        labels: {
          BellIcon: "bell",
          AlertIcon: "alert",
          InfoIcon: "info",
          CheckIcon: "check",
        },
      },
      description: "icon",
    },
  },
  args: {
    text: "This is default message - check it out!",
    variant: "default",
    icon: BellIcon,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2830%3A14309&t=wfQIehNzi01pCu8N-0",
    },
  },
} as ComponentMeta<React.FC<InlineMessageProps>>;

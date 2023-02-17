import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";

interface AnchorProps {
  text: string;
  link: string;
  decoration?: "none" | "bottom" | "left";
  className?: string;
  role?: string;
}

export const Anchor: ComponentStory<React.FC<AnchorProps>> = ({
  text,
  link,
  decoration = "none",
  className,
  role,
}) => {
  const decorationVariants = {
    none: "text-primary-500 hover:text-primary-600 focus:text-primary-300",
    bottom:
      "border-b border-primary-500 text-primary-500 hover:text-primary-600 hover:border-primary-600 focus:text-primary-300 focus:border-primary-300",
    left: "border-l-2 px-4 py-2 border-neutral-100 text-neutral-400 hover:border-neutral-400 focus:border-neutral-600",
  };

  //TIP:classes to use for active tab link
  const activeStyle = "text-primary-500 border-primary-500";

  return (
    <a
      className={classNames(
        "text-sm",
        decorationVariants[decoration],
        activeStyle,
        className
      )}
      href={link}
      role={role}
    >
      {text}
    </a>
  );
};

export default {
  title: "Atoms/Anchor",
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

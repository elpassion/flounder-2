import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ReactComponent as PlusIcon } from "icons/plus.svg";
import { ReactComponent as ChevronDownIcon } from "icons/chevron-down.svg";
import classNames from "classnames";
import React from "react";

type AccordionIcon = "left" | "right";

interface AccordionItemProps {
  id: number;
  title: string;
  description: React.ReactNode;
  expanded?: boolean;
  onClick?: () => void;
}

interface AccordionProps {
  divider?: boolean;
  icon?: AccordionIcon;
  items: AccordionItemProps[];
}

export const Accordion: ComponentStory<React.FC<AccordionProps>> = ({
  divider = false,
  icon = "left",
  items,
}) => {
  const iconVariants = {
    left: "order-first mr-2",
    right: "ml-2",
  };

  const Accordion = {
    Item: ({ title, description, expanded = false }: AccordionItemProps) => {
      const [isExpanded, setIsExpanded] = React.useState(expanded);
      const toggleExpanded = () => setIsExpanded(!isExpanded);

      return (
        <div className="w-full">
          <button
            className={classNames(
              "flex w-full items-center justify-between rounded bg-neutral-50 p-3 py-3 pl-3 pr-4 text-left text-neutral-700 hover:bg-neutral-100",
              {
                "bg-neutral-100": isExpanded,
              }
            )}
            onClick={toggleExpanded}
          >
            <span className="text-sm font-medium">{title}</span>
            <Accordion.Icon />
          </button>
          {isExpanded && (
            <div className="p-3 text-sm text-neutral-900">{description}</div>
          )}
        </div>
      );
    },
    Icon: () => (
      <span className={classNames(iconVariants[icon])}>
        {divider ? (
          <PlusIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </span>
    ),
    Body: () => <div>Body</div>,
  };

  return (
    <div className="w-full">
      {items.map((item) => (
        <Accordion.Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default {
  title: "Atoms/Accordion",
  component: Accordion,
  argTypes: {
    divider: {
      control: "boolean",
    },
    icon: {
      control: "radio",
      options: ["left", "right"],
    },
    items: {
      control: "object",
    },
  },
  args: {
    divider: false,
    icon: "left",
    items: [
      {
        id: 1,
        title: "Accordion item 1",
        description: "Accordion item 1 description",
        expanded: true,
      },
      {
        id: 2,
        title: "Accordion item 2",
        description: "Accordion item 2 description",
        expanded: false,
      },
      {
        id: 3,
        title: "Accordion item 3",
        description: "Accordion item 3 description",
        expanded: false,
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2882%3A12680&t=wfQIehNzi01pCu8N-0",
    },
  },
} as ComponentMeta<React.FC<AccordionProps>>;

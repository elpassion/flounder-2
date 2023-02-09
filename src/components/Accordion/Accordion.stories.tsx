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

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={item.id} className={"mb-3"}>
          <button
            type="button"
            className={classNames(
              "flex w-full items-center text-xs font-bold transition ease-in",
              {
                "border-b border-neutral-300 py-3 pl-3 pr-4 text-neutral-600":
                  divider,
                "rounded bg-neutral-50 py-3 pl-3 pr-4 text-neutral-700 hover:bg-neutral-100":
                  !divider,
              },
              {
                "justify-between": icon === "right",
              }
            )}
            aria-expanded={item.expanded}
          >
            <span className="flex items-center">{item.title}</span>
            {divider ? (
              <PlusIcon
                className={classNames("h-4 w-4 shrink-0", iconVariants[icon])}
              />
            ) : (
              <ChevronDownIcon
                className={classNames("h-4 w-4 shrink-0", iconVariants[icon])}
              />
            )}
          </button>
          {item.expanded && (
            <div
              className={classNames(
                "py-3 pr-3 text-xs text-neutral-600",
                {
                  "pl-9": icon === "left",
                },
                {
                  "pl-3": icon === "right",
                }
              )}
            >
              {item.description}
            </div>
          )}
        </div>
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

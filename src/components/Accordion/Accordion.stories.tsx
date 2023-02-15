import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ReactComponent as PlusIcon } from "icons/plus.svg";
import { ReactComponent as ChevronDownIcon } from "icons/chevron-down.svg";
import classNames from "classnames";
import React from "react";
import {
  AccordionBodyProps,
  AccordionButtonProps,
  AccordionIconPositionVariants,
  AccordionProps,
} from "./Accordion.interface";

export const Accordion: ComponentStory<React.FC<AccordionProps>> = ({
  divider = false,
  icon,
  items,
}) => {
  const Accordion = {
    BaseAccordion: ({ items }: AccordionProps) => {
      return (
        <div className="w-full">
          {items.map(({ title, id, description, expanded }) => (
            <div key={id} className={"mb-3"}>
              <Accordion.Button title={title} expanded={expanded}>
                <Accordion.Icon align={"left"} />
              </Accordion.Button>
              {expanded && <Accordion.Body description={description} />}
            </div>
          ))}
        </div>
      );
    },
    Button: ({ children, title, expanded }: AccordionButtonProps) => {
      return (
        <button
          className={classNames(
            `flex w-full items-center text-xs font-bold transition ease-in`,
            {
              "border-b border-neutral-300 py-3 pl-3 pr-4 text-neutral-600":
                divider,
              "rounded bg-neutral-50 py-3 pl-3 pr-4 text-neutral-700 hover:bg-neutral-100":
                !divider,
            },
            {
              "rounded-t border-neutral-50 bg-neutral-50": expanded && divider,
            },
            {
              "bg-neutral-100": expanded && !divider,
            }
          )}
        >
          <span className="flex items-center">{title}</span>
          {children}
        </button>
      );
    },
    Icon: ({ align }: AccordionIconPositionVariants) => {
      const iconVariants = {
        left: "order-first mr-2",
        right: "ml-2",
      };

      return (
        <PlusIcon
          className={classNames("h-4 w-4 shrink-0", iconVariants[align])}
        />
      );
    },
    Body: ({ description }: AccordionBodyProps) => {
      const iconVariant = {
        left: "pl-9",
        right: "pl-3",
      };

      return (
        <div
          className={classNames(
            "rounded-b bg-neutral-50 py-3 pr-3 text-xs text-neutral-600",
            iconVariant[icon]
          )}
        >
          {description}
        </div>
      );
    },
  };

  return (
    <Accordion.BaseAccordion divider={divider} icon={icon} items={items} />
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

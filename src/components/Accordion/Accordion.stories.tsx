import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ReactComponent as PlusIcon } from "icons/plus.svg";
import { ReactComponent as MinusIcon } from "icons/minus.svg";
import classNames from "classnames";
import React from "react";
import {
  AccordionBodyProps,
  AccordionButtonProps,
  AccordionProps,
} from "./Accordion.interface";

export const Accordion: ComponentStory<React.FC<AccordionProps>> = ({
  variant,
  icon,
  items,
}) => {
  const Accordion = {
    BaseAccordion: ({ items }: AccordionProps) => {
      return (
        <div className="w-full">
          {items.map(({ title, id, description, expanded }) => (
            <div key={id} className={"mb-3"}>
              <Accordion.Button title={title} expanded={expanded} icon={icon}>
                <Accordion.Icon>
                  {expanded ? <MinusIcon /> : <PlusIcon />}
                </Accordion.Icon>
              </Accordion.Button>
              {expanded && (
                <Accordion.Body description={description} icon={icon} />
              )}
            </div>
          ))}
        </div>
      );
    },
    Button: ({ children, title, expanded, icon }: AccordionButtonProps) => {
      const buttonVariants = {
        bordered: `border-b border-neutral-300 py-3 pl-3 pr-4 text-neutral-600 ${
          expanded && "border-transparent"
        }`,
        solid: `rounded bg-neutral-50 py-3 pl-3 pr-4 text-neutral-700 hover:bg-neutral-100 ${
          expanded && "bg-neutral-100"
        }`,
      };

      return (
        <button
          className={classNames(
            `flex w-full items-center text-xs font-bold transition ease-in ${
              icon === "right" && "justify-between"
            }`,
            buttonVariants[variant]
          )}
        >
          <span className="flex items-center">{title}</span>
          {children}
        </button>
      );
    },
    Icon: ({ children }: React.PropsWithChildren) => {
      const iconVariants = {
        left: "order-first mr-2",
        right: "ml-2",
      };

      return (
        <div
          className={classNames(
            "flex h-4 w-4 shrink-0 items-center",
            iconVariants[icon]
          )}
        >
          {children}
        </div>
      );
    },
    Body: ({ description, icon }: AccordionBodyProps) => {
      const iconVariants = {
        left: "pl-9",
        right: "pl-3",
      };

      return (
        <div
          className={classNames(
            "rounded-b py-3 pr-3 text-xs text-neutral-600",
            iconVariants[icon]
          )}
        >
          {description}
        </div>
      );
    },
  };

  return (
    <Accordion.BaseAccordion variant={variant} icon={icon} items={items} />
  );
};

export default {
  title: "Atoms/Accordion",
  component: Accordion,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["bordered", "solid"],
      },
    },
    icon: {
      control: {
        type: "select",
        options: ["left", "right"],
      },
    },
  },
  args: {
    variant: "bordered",
    icon: "left",
    items: [
      {
        id: 1,
        title: "Accordion 1",
        description: "Accordion 1 description",
        expanded: true,
      },
      {
        id: 2,
        title: "Accordion 2",
        description: "Accordion 2 description",
        expanded: false,
      },
      {
        id: 3,
        title: "Accordion 3",
        description: "Accordion 3 description",
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

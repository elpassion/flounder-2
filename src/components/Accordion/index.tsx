import classNames from "classnames";

import {
  AccordionBodyProps,
  AccordionButtonProps,
  AccordionIconProps,
  AccordionProps,
} from "./Accordion.interface";

const AccordionComponents = {
  Body: ({ description, iconPosition }: AccordionBodyProps) => {
    const iconVariants = {
      left: "pl-9",
      right: "pl-3",
    };

    return (
      <div
        className={classNames(
          "rounded-b py-3 pr-3 text-xs text-neutral-600",
          iconVariants[iconPosition]
        )}
      >
        {description}
      </div>
    );
  },
  Button: ({
    children,
    title,
    expanded,
    iconPosition,
    variant,
  }: AccordionButtonProps) => {
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
          "flex w-full items-center text-xs font-bold transition ease-in",
          iconPosition === "right" && "justify-between",
          buttonVariants[variant]
        )}
      >
        <span className="flex items-center">{title}</span>
        {children}
      </button>
    );
  },
  Icon: ({ icon, iconPosition }: AccordionIconProps) => {
    const iconVariants = {
      left: "order-first mr-2",
      right: "ml-2",
    };

    return (
      <div
        className={classNames(
          "flex shrink-0 items-center",
          iconVariants[iconPosition]
        )}
      >
        <span
          className="font-icons text-2xl"
          dangerouslySetInnerHTML={{ __html: `${icon};` }}
        />
      </div>
    );
  },
};

export const Accordion: React.FC<AccordionProps> = ({
  variant,
  iconPosition,
  items,
}) => {
  return (
    <div className="w-full">
      {items.map(({ title, id, description, expanded }) => (
        <div key={id} className="mb-3">
          <AccordionComponents.Button
            title={title}
            expanded={expanded}
            iconPosition={iconPosition}
            variant={variant}
          >
            <AccordionComponents.Icon
              iconPosition={iconPosition}
              icon={expanded ? "&#xea26" : "&#xeac0"}
            />
          </AccordionComponents.Button>
          {expanded && (
            <AccordionComponents.Body
              description={description}
              iconPosition={iconPosition}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;

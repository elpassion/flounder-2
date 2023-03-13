import classNames from "classnames";
import ChevronDownSvg from "#svgs/ChevronDownSvg";
import MinusSvg from "#svgs/MinusSvg";
import * as Accordion from "./";
import type {
  AccordionBodyProps,
  AccordionButtonProps,
  AccordionIconProps,
  AccordionProps,
} from "./Accordion.interface";

export const Body: React.FC<AccordionBodyProps> = ({
  description,
  iconPosition,
}) => {
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
};

export const Button: React.FC<AccordionButtonProps> = ({
  children,
  title,
  expanded,
  iconPosition,
  variant,
}) => {
  const buttonVariants = {
    bordered: classNames(
      "border-b border-neutral-300 py-3 pl-3 pr-4 text-neutral-600",
      expanded && "border-transparent"
    ),
    solid: classNames(
      "rounded bg-neutral-50 py-3 pl-3 pr-4 text-neutral-700 hover:bg-neutral-100",
      expanded && "bg-neutral-100"
    ),
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
};

export const Icon: React.FC<AccordionIconProps> = ({ icon, iconPosition }) => {
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
      {icon}
    </div>
  );
};

const AccordionComponent: React.FC<AccordionProps> = ({
  variant,
  iconPosition,
  expandedId,
  items,
  icon = "chevron",
}) => {
  return (
    <div className="w-full">
      {items.map(({ title, id, description }) => {
        const isExpanded = id === expandedId;

        return (
          <div key={id} className="mb-3">
            <Accordion.Button
              title={title}
              expanded={isExpanded}
              iconPosition={iconPosition}
              variant={variant}
            >
              {icon === "chevron" ? (
                <Accordion.Icon
                  iconPosition={iconPosition}
                  icon={
                    <ChevronDownSvg
                      className={classNames("h-5 w-5 transform transition", {
                        "rotate-0": isExpanded,
                        "-rotate-90": !isExpanded,
                      })}
                    />
                  }
                />
              ) : (
                <Accordion.Icon
                  iconPosition={iconPosition}
                  icon={
                    <div className="relative flex h-4 w-4 items-center justify-center">
                      <MinusSvg />
                      <MinusSvg
                        className={classNames("absolute transform transition", {
                          "rotate-0": isExpanded,
                          "-rotate-90": !isExpanded,
                        })}
                      />
                    </div>
                  }
                />
              )}
            </Accordion.Button>
            {isExpanded && (
              <Accordion.Body
                description={description}
                iconPosition={iconPosition}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AccordionComponent;

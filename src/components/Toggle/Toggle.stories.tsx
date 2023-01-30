import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";

interface ToggleProps {
  size: "sm" | "md";
  labelText?: string;
  supportingText?: string;
  disabled?: boolean;
}

export const Toggle: ComponentStory<React.FC<ToggleProps>> = ({
  size = "sm",
  labelText,
  supportingText,
  disabled,
}) => {
  const sizeVariant = {
    sm: "h-5 w-9 after:h-4 after:w-4 peer-checked:after:translate-x-4",
    md: "h-6 w-11 after:h-5 after:w-5 peer-checked:after:translate-x-5",
  };

  const fontSizeVariant = {
    sm: "text-sm",
    md: "text-base",
  };

  return (
    <div>
      <label className="group relative flex items-start">
        <input
          type="checkbox"
          className="peer absolute left-1/2 hidden h-full w-full -translate-x-1/2 appearance-none rounded-md"
          disabled={disabled}
        />
        <span
          className={classNames(
            "flex flex-shrink-0 cursor-pointer items-center rounded-full bg-neutral-100 p-0.5 opacity-100 duration-300 ease-in-out",
            "after:rounded-full after:bg-white after:shadow-sm after:duration-300",
            "hover:bg-neutral-200",
            "peer-checked:bg-primary-500",
            "peer-disabled:cursor-not-allowed peer-disabled:after:bg-neutral-50",
            sizeVariant[size]
          )}
        ></span>
        {labelText && (
          <span
            className={classNames(
              "ml-2 flex flex-col font-medium text-neutral-600",
              fontSizeVariant[size]
            )}
          >
            {labelText}
            {supportingText && (
              <span
                className={classNames(
                  "mt-0.5 flex font-normal text-neutral-500",
                  fontSizeVariant[size]
                )}
              >
                {supportingText}
              </span>
            )}
          </span>
        )}
      </label>
    </div>
  );
};

export default {
  title: "Toggle",
  component: Toggle,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "sm | md",
    },
    labelText: {
      description: "string",
    },
    supportingText: {
      description: "string",
    },
    disabled: {
      description: "boolean",
    },
  },
  args: {
    size: "md",
    labelText: "",
    supportingText: "",
    disabled: false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2641%3A12452&t=r0ZlNZ1jXkJ9BfnD-4",
    },
  },
} as ComponentMeta<React.FC<ToggleProps>>;

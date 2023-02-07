import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";
import {
  Title,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

import { ReactComponent as CheckIcon } from "icons/check.svg";

export interface CheckboxProps {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  size?: "sm" | "md";
  labelText?: string;
  optionalLabelText?: string;
  supportingText?: string;
  labelPosition?: "left" | "right";
  onChange?: () => void;
}

const docs: string = `# Usage <br/> 
| DO | DON’T |
| ----------- | ----------- |
| Use checkboxes when the user can select more than one option. | Don't use checkboxes for a group of items where the user can select only a single option. Instead, use radio buttons. |
| Checkboxes let users select one or more options from a list. A parent checkbox allows for easy selection or deselection of all items. | If a list consists of multiple options, don't use switches. Instead, use checkboxes. Checkboxes imply the items are related, and take up less visual space. |`;

export const Checkbox: ComponentStory<React.FC<CheckboxProps>> = ({
  name,
  checked,
  disabled,
  error,
  required,
  size = "md",
  onChange,
  labelPosition,
  labelText,
  optionalLabelText,
  supportingText,
}) => {
  const fontColor = error ? "text-error-500" : "text-neutral-500";

  const sizeVariants = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  const fontSizeVariants = {
    sm: "text-sm",
    md: "text-base",
  };

  const iconSizesVariants = {
    sm: 10,
    md: 12,
  };

  return (
    <>
      <div
        className={classNames(
          "group flex w-fit items-baseline gap-2",
          {
            "flex-row-reverse": labelPosition === "left",
            "w-full max-w-[344px] justify-between":
              supportingText && labelPosition === "left",
          },
          fontColor
        )}
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          className={classNames(
            "peer absolute h-4 w-4 cursor-pointer opacity-0",
            "disabled:cursor-default"
          )}
          disabled={disabled}
          defaultChecked={checked}
          required={required}
          onChange={onChange}
        />
        <div
          className={classNames(
            "flex flex-shrink-0 items-center justify-center rounded border border-neutral-300 bg-white text-transparent",
            "group-hover:bg-primary-50",
            "peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-500",
            "peer-focus:border-primary-500 peer-focus:ring peer-focus:ring-primary-50",
            "peer-disabled:border-neutral-50 peer-disabled:bg-neutral-100 peer-disabled:peer-checked:text-neutral-50",
            sizeVariants[size],
            error && "border-error-500",
            error && "group-hover:bg-inherit",
            error &&
              "peer-checked:border-error-500 peer-checked:bg-error-50 peer-checked:text-error-500",
            error && "peer-focus:border-error-500 peer-focus:ring-0"
          )}
        >
          <CheckIcon
            height={iconSizesVariants[size]}
            width="100%"
            strokeWidth={4}
          />
        </div>
        <div
          className={classNames(
            !supportingText && "peer-disabled:text-neutral-200",
            fontColor
          )}
        >
          {labelText && (
            <label
              htmlFor={name}
              className={classNames(
                "flex cursor-pointer gap-1 font-medium",
                fontSizeVariants[size]
              )}
            >
              {labelText}
              {required === true && <span>*</span>}
              {required === false && (
                <span
                  className={classNames("text-xs", error && "text-transparent")}
                >
                  {optionalLabelText}
                </span>
              )}
            </label>
          )}
          {supportingText && (
            <p
              className={classNames(
                "text-sm font-normal",
                fontSizeVariants[size],
                fontColor
              )}
            >
              {supportingText}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default {
  title: "Atoms/Checkbox",
  component: Checkbox,
  argTypes: {
    name: {
      description: "string",
    },
    labelText: {
      description: "string",
    },
    optionalLabelText: {
      description: "string",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
      description: "left | right",
    },
    supportingText: {
      description: "string",
    },
    checked: {
      description: "boolean",
    },
    required: {
      description: "boolean",
    },
    disabled: {
      description: "boolean",
    },
    error: {
      description: "boolean",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "sm | md",
    },
    onChange: {
      description: "function",
    },
  },
  args: {
    name: "withSupportingText",
    labelText: "Don't show again",
    optionalLabelText: "(optional)",
    labelPosition: "right",
    supportingText: "Save my login details for next time.",
    checked: false,
    required: false,
    disabled: false,
    error: false,
    size: "md",
    onChange: undefined,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2432%3A10986&t=UrLZo5oibLW5eXuj-4",
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
} as ComponentMeta<React.FC<CheckboxProps>>;

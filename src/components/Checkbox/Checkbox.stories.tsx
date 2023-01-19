import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

import classNames from "classnames";
import React from "react";

export interface CheckboxProps {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  size?: "sm" | "md";
  labelText: string;
  supportingText: string;
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
  size,
  onChange,
  labelPosition,
  labelText,
  supportingText,
}) => {
  const isMediumSize = size === "md";
  return (
    <>
      <div
        className={classNames("group flex w-fit items-center gap-2", {
          "flex-row-reverse": labelPosition === "left",
          "w-[344px] justify-between":
            supportingText && labelPosition === "left",
        })}
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          className={classNames(
            "peer absolute h-4 w-4 opacity-0",
            !disabled && "cursor-pointer"
          )}
          disabled={disabled}
          defaultChecked={checked}
          required={required}
          onChange={onChange}
        />
        <div
          className={classNames(
            "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border bg-white text-transparent",
            {
              "border-neutral-300 group-hover:bg-primary-50 peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-500 peer-focus:border-primary-500 peer-focus:ring peer-focus:ring-primary-50":
                !disabled,
              "border-neutral-50 bg-neutral-100 peer-checked:text-neutral-50":
                disabled,
              "border-error-500 group-hover:bg-inherit peer-checked:border-error-500 peer-checked:bg-error-50 peer-checked:text-error-500 peer-focus:border-error-500 peer-focus:ring-0":
                error,
              "h-5 w-5": isMediumSize,
            }
          )}
        >
          <svg
            width={isMediumSize ? "14" : "12"}
            height={isMediumSize ? "14" : "12"}
            viewBox={isMediumSize ? "0 0 14 14" : "0 0 12 12"}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={
                isMediumSize
                  ? "M11.6666 3.5L5.24992 9.91667L2.33325 7"
                  : "M10 3L4.5 8.5L2 6"
              }
              stroke="currentColor"
              strokeWidth={isMediumSize ? "2" : "1.6666"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {labelText && (
          <div>
            <label
              htmlFor={name}
              className={classNames(
                "cursor-pointer text-sm font-medium text-neutral-600",
                {
                  "text-neutral-200": disabled && !supportingText,
                  "text-error-500": error,
                  "text-base": isMediumSize,
                }
              )}
            >
              {labelText}
              {required === true && "*"}
              {required === false && (
                <span
                  className={classNames("ml-1 text-xs", {
                    "text-neutral-200": disabled && !supportingText,
                    "text-neutral-400": !error && !disabled,
                    "text-transparent": error,
                  })}
                >
                  (optional)
                </span>
              )}
            </label>
          </div>
        )}
      </div>
      {supportingText && (
        <p
          className={classNames("text-sm font-normal", {
            "ml-6": !isMediumSize && labelPosition === "right",
            "ml-7": isMediumSize && labelPosition === "right",
            "text-base": isMediumSize,
            "text-neutral-500": !error,
            "text-error-500": error,
          })}
        >
          {supportingText}
        </p>
      )}
    </>
  );
};

export default {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    name: {
      description: "string",
    },
    labelText: {
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

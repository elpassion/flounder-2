import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";
import React from "react";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";

export interface RadioProps {
  name: string;
  id: string;
  checked?: boolean;
  disabled?: boolean;
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
| Use radio buttons to select a single item from a small set of options. | Don't use radio buttons to select from a long list of options. Dropdown menu is a better choice in such case. |
| Use labels that are short, direct, unambiguous and unchanging. | Do not mix radio buttons and checkboxes in a single selection. |
| Avoid offering more than 5 options. | |
| Capitalise the label, do not use full stops. | |
| For items with descriptions, the latter should be capitalised and end with a full stop. Keep the descriptions as short as possible (single-line description is ideal). Otherwise, consider other options of conveying the information, such as intro text or a message box. | |
| If a text label overflows its container, it should be wrapped. Avoid labels wrapping into more than 2 lines. | |`;

export const Radio: ComponentStory<React.FC<RadioProps>> = ({
  name,
  id,
  checked,
  disabled,
  error,
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
          type="radio"
          id={id}
          name={name}
          className={classNames(
            "peer absolute h-4 w-4 opacity-0",
            !disabled && "cursor-pointer"
          )}
          disabled={disabled}
          defaultChecked={checked}
          onChange={onChange}
        />
        <div
          className={classNames(
            "after:content'' flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-lg border bg-white text-transparent after:h-[6px] after:w-[6px] after:rounded-[3px]",
            {
              "border-neutral-300 group-hover:bg-primary-50 peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-500 peer-checked:after:bg-primary-500 peer-focus:border-primary-500 peer-focus:ring peer-focus:ring-primary-50":
                !disabled && !error,
              "border-neutral-50 bg-neutral-100 peer-checked:text-neutral-50 peer-checked:after:bg-neutral-50":
                disabled,
              "border-error-500 group-hover:bg-inherit peer-checked:border-error-500 peer-checked:bg-error-50 peer-checked:text-error-500 peer-checked:after:bg-error-500 peer-focus:border-error-500 peer-focus:ring-0":
                error,
              "h-5 w-5 rounded-[10px] after:h-2 after:w-2 after:rounded":
                isMediumSize,
            }
          )}
        ></div>
        {labelText && (
          <div>
            <label
              htmlFor={id}
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
  title: "Radio",
  component: Radio,
  argTypes: {
    id: {
      description: "string",
    },
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
    id: "withSupportingText",
    name: "firstRadioGroup",
    labelText: "Don't show again",
    labelPosition: "right",
    supportingText: "Save my login details for next time.",
    checked: false,
    disabled: false,
    error: false,
    size: "md",
    onChange: undefined,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2333%3A11688&t=21PNe6GxB9R5K2SQ-0",
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
} as ComponentMeta<React.FC<RadioProps>>;

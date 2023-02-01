import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";

import { ReactComponent as AlertIcon } from "icons/alert-circle.svg";
import { ReactComponent as HelpIcon } from "icons/help-circle.svg";
import { ReactComponent as ChevronIcon } from "icons/chevron-down.svg";
import {
  SuffixProps,
  InputProps,
  PrefixTextProps,
  DropdownButtonProps,
  TextProps,
  IconProps,
} from "./Input.interface";

const docs: string = `# Usage <br/> 
| DO | <div style="width:20vw">DON’T</div> |
| ----------- | ----------- |
|Place labels directly above the input, and align to the left.| |
|For helper text provide an example or specific syntax for the input, rather than in the input area, so that it's visible after text has been entered. Only use this where clarification is required, and try not to overuse it.| |
|Field label text above the input area should be short and concise.| |`;

export const Input: ComponentStory<React.FC<InputProps>> = ({
  label,
  placeholder,
  supportingText,
  disabled,
  required,
  errorMessage,
  inputVariant = "default",
  type = "text",
  ...props
}) => {
  const isError = !!errorMessage;

  const inputBorderColorStyle = {
    true: "border-error-500 focus:border-error-500",
    false: "border-neutral-200 focus:border-neutral-200",
  };

  const focusColorStyle = {
    true: "peer-focus:shadow-focusedErrorInput peer-focus:after:border-error-500",
    false: "peer-focus:shadow-focusedInput peer-focus:after:border-neutral-200",
  };

  const inputVariantsStyle = {
    default: "rounded-lg",
    prefixText: "col-start-2 rounded-r-lg z-10",
    prefixDropdown: "col-start-2 rounded-r-lg border-l-0",
    suffixDropdown: "col-end-2 rounded-l-lg border-r-0",
  };

  const gridTemplates = {
    default: "grid-cols-1",
    prefixText: "grid-cols-[auto_1fr]",
    prefixDropdown: "grid-cols-[auto_1fr]",
    suffixDropdown: "grid-cols-[1fr_auto]",
  };

  const Input = {
    Prefix: ({ inputVariant, prefixText, ...props }: PrefixTextProps) => {
      const isPrefix =
        inputVariant === "prefixText" || inputVariant === "prefixDropdown";

      const styleVariants = {
        prefixText: "bg-neutral-50 text-neutral-400 border-neutral-200",
        // @ts-ignore Type 'boolean' cannot be used as an index type.ts(2538)
        prefixDropdown: `relative bg-white ${inputBorderColorStyle[isError]} ${focusColorStyle[isError]} peer-focus:after:content'' peer-focus:after:absolute peer-focus:after:-right-2 peer-focus:after:-top-px peer-focus:after:h-[calc(100%+2px)] peer-focus:after:w-2 peer-focus:after:border-y peer-focus:after:bg-white`,
      };

      if (!isPrefix) return <></>;

      return (
        <div
          className={classNames(
            "col-end-2 row-start-2 rounded-l-lg border border-r-0 py-2.5 pl-3.5",
            styleVariants[inputVariant],
            "peer-disabled:bg-neutral-50 peer-disabled:text-neutral-200"
          )}
        >
          {inputVariant === "prefixText" && (
            <span className="pr-3.5">{prefixText}</span>
          )}
          {inputVariant === "prefixDropdown" && (
            <Input.DropdownButton text={prefixText} {...props} />
          )}
        </div>
      );
    },
    Suffix: ({ inputVariant, suffixText, ...props }: SuffixProps) => {
      if (inputVariant !== "suffixDropdown") return <></>;

      return (
        <div
          className={classNames(
            "relative rounded-r-lg border border-l-0 bg-white py-2.5 pr-3.5 text-neutral-900",
            "peer-disabled:bg-neutral-50 peer-disabled:text-neutral-200",
            "peer-focus:after:content'' peer-focus:after:absolute peer-focus:after:-left-2 peer-focus:after:-top-px peer-focus:after:h-[calc(100%+2px)] peer-focus:after:w-2 peer-focus:after:border-y peer-focus:after:bg-white",
            // @ts-ignore Type 'boolean' cannot be used as an index type.ts(2538)
            inputBorderColorStyle[isError], focusColorStyle[isError]
          )}
        >
          <Input.DropdownButton text={suffixText} {...props} />
        </div>
      );
    },
    DropdownButton: ({ text, disabled }: DropdownButtonProps) => (
      <button className="flex items-center gap-2" disabled={disabled}>
        <span>{text}</span>
        <ChevronIcon />
      </button>
    ),
    Text: ({ text, type }: TextProps) => {
      const textStyleVariants = {
        label:
          "order-first col-start-1 col-end-3 font-medium text-neutral-700 peer-disabled:text-neutral-200",
        supportingText:
          "col-start-1 col-end-3 text-neutral-400 peer-disabled:text-neutral-200",
        errorMessage: "col-start-1 col-end-3 m-0 mt-1.5 p-0 text-error-500",
      };
      return (
        <p className={classNames("m-0 p-0 text-sm", textStyleVariants[type])}>
          {text}
        </p>
      );
    },
    Icon: ({ isError }: IconProps) => (
      <div
        className={classNames(
          "absolute right-3.5 row-start-2 pt-3.5 text-neutral-300",
          "peer-disabled:text-neutral-200",
          inputVariantsStyle[inputVariant]
        )}
      >
        {isError ? <AlertIcon className="text-error-500" /> : <HelpIcon />}
      </div>
    ),
  };

  return (
    <>
      <label
        className={classNames(
          "relative grid gap-y-1.5",
          gridTemplates[inputVariant]
        )}
      >
        <input
          placeholder={placeholder}
          className={classNames(
            "peer row-start-2 w-full border bg-white py-2.5 pl-3.5 pr-10 text-neutral-900",
            "placeholder:text-neutral-400",
            "disabled:bg-neutral-50 disabled:placeholder:text-neutral-200",
            "focus:shadow-focusedInput focus:outline-none focus:ring-0 focus:placeholder:text-white",
            isError && "focus:shadow-focusedErrorInput",
            // @ts-ignore Type 'boolean' cannot be used as an index type.ts(2538)
            inputBorderColorStyle[isError],
            inputVariantsStyle[inputVariant]
          )}
          disabled={disabled}
          required={required}
          type={type}
        />

        <Input.Icon isError={isError} />

        <Input.Prefix
          inputVariant={inputVariant}
          disabled={disabled}
          {...props}
        />
        <Input.Suffix
          inputVariant={inputVariant}
          disabled={disabled}
          {...props}
        />
        <Input.Text text={label} type="label" />

        {supportingText && !isError && (
          <Input.Text text={supportingText} type="supportingText" />
        )}
      </label>

      {isError && <Input.Text text={errorMessage} type="errorMessage" />}
    </>
  );
};

export default {
  title: "Atoms/Input",
  component: Input,
  argTypes: {
    label: {
      description: "string",
      type: { required: true, name: "string" },
    },
    placeholder: {
      description: "string",
    },
    supportingText: {
      description: "string",
    },
    disabled: {
      description: "boolean",
    },
    errorMessage: {
      description: "string",
    },
    inputVariant: {
      control: "select",
      options: ["default", "prefixText", "prefixDropdown", "suffixDropdown"],
      description: "default | prefixText | prefixDropdown | suffixDropdown",
    },
    prefixText: {
      description: "string",
    },
    suffixText: {
      description: "string",
    },
    type: {
      control: "select",
      options: ["text", "number", "email", "password"],
      description: "only examples: text | number | email | password",
    },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    supportingText: "Write here some tips",
    disabled: false,
    errorMessage: "",
    inputVariant: "default",
    prefixText: "https://",
    suffixText: "@elpassion.pl",
    type: "text",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2691%3A17978&t=zWSgI9j4IBnJou8M-0",
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
} as ComponentMeta<React.FC<InputProps>>;

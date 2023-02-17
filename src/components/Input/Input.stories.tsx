import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";

import {
  SuffixProps,
  InputProps,
  PrefixProps,
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
  inputType = "text",
  prefixOrSuffixText = "",
  ariaLive,
  ariaLabel,
  ariaDescribedBy,
  ariaDescribedByError,
  ...props
}) => {
  const isError = !!errorMessage;

  const inputBorderColorStyle: { [key: string]: string } = {
    true: "border-error-500 focus:border-error-500",
    false: "border-neutral-200 focus:border-neutral-200",
  };

  const focusColorStyle: { [key: string]: string } = {
    true: "peer-focus:shadow-focused peer-focus:shadow-error-100 peer-focus:after:border-error-500",
    false:
      "peer-focus:shadow-focused peer-focus:shadow-secondary-50 peer-focus:after:border-neutral-200",
  };

  const inputVariantsStyle = {
    default: "rounded-lg",
    prefixText: "col-start-2 rounded-r-lg z-10",
    prefixDropdown: "col-start-2 rounded-r-lg border-l-0",
    prefixIcon: "col-start-2 rounded-r-lg border-l-0",
    suffixDropdown: "col-end-2 rounded-l-lg border-r-0",
  };

  const gridTemplates = {
    default: "grid-cols-1",
    prefixText: "grid-cols-[auto_1fr]",
    prefixDropdown: "grid-cols-[auto_1fr]",
    prefixIcon: "grid-cols-[auto_1fr]",
    suffixDropdown: "grid-cols-[1fr_auto]",
  };

  const Input = {
    Prefix: ({
      inputVariant,
      prefixText,
      prefixIcon = "&#xea6b",
      ...props
    }: PrefixProps) => {
      const isPrefix =
        inputVariant === "prefixText" ||
        inputVariant === "prefixDropdown" ||
        inputVariant === "prefixIcon";

      const styleVariants = {
        prefixText: "bg-neutral-50 text-neutral-400 border-neutral-200",
        prefixDropdown: `relative bg-white ${
          inputBorderColorStyle[String(isError)]
        } ${
          focusColorStyle[String(isError)]
        } peer-focus:after:content'' peer-focus:after:absolute peer-focus:after:-right-2 peer-focus:after:-top-px peer-focus:after:h-[calc(100%+2px)] peer-focus:after:w-2 peer-focus:after:border-y peer-focus:after:bg-white`,
        prefixIcon: `relative bg-white flex items-center ${
          inputBorderColorStyle[String(isError)]
        } ${
          focusColorStyle[String(isError)]
        } peer-focus:after:content'' peer-focus:after:absolute peer-focus:after:-right-2 peer-focus:after:-top-px peer-focus:after:h-[calc(100%+2px)] peer-focus:after:w-2 peer-focus:after:border-y peer-focus:after:bg-white`,
      };

      if (!isPrefix) return <></>;

      return (
        <div
          className={classNames(
            "z-50 col-end-2 row-start-2 rounded-l-lg border border-r-0 py-2.5 pl-3.5",
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
          {inputVariant === "prefixIcon" && (
            <span
              className={classNames(
                "font-icons text-xl",
                disabled ? "text-neutral-200" : "text-neutral-400"
              )}
              dangerouslySetInnerHTML={{ __html: `${prefixIcon};` }}
            />
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
            inputBorderColorStyle[String(isError)],
            focusColorStyle[String(isError)]
          )}
        >
          <Input.DropdownButton text={suffixText} {...props} />
        </div>
      );
    },
    DropdownButton: ({ text, disabled }: DropdownButtonProps) => (
      <button className="flex items-center gap-2" disabled={disabled}>
        <span>{text}</span>
        <span className="font-icons text-base">&#xeacb;</span>
      </button>
    ),
    Text: ({ text, type }: TextProps) => {
      const textStyleVariants = {
        label:
          "order-first col-start-1 col-end-3 font-medium text-neutral-700 peer-disabled:text-neutral-200",
        supportingText:
          "col-start-1 col-end-3 text-neutral-400 peer-disabled:text-neutral-200",
        errorMessage: "col-start-1 col-end-3 m-0 p-0 pt-1.5 text-error-500",
      };
      return (
        <p className={classNames("m-0 p-0 text-sm", textStyleVariants[type])}>
          {text}
        </p>
      );
    },
    Icon: ({ tooltipIcon, isError }: IconProps) => {
      if (!tooltipIcon) return <></>;

      return (
        <div
          className={classNames(
            "absolute right-3.5 row-start-2 row-end-3 flex h-full items-center text-neutral-300",
            "peer-disabled:text-neutral-200",
            inputVariantsStyle[inputVariant]
          )}
        >
          {isError ? (
            <span className="font-icons text-base text-error-500">
              &#xeb1b;
            </span>
          ) : (
            <span
              className="font-icons text-base"
              dangerouslySetInnerHTML={{ __html: `${tooltipIcon};` }}
            />
          )}
        </div>
      );
    },
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
            "focus:shadow-focused focus:shadow-secondary-50 focus:outline-none focus:ring-0 focus:placeholder:text-white",
            isError && "focus:shadow-focused focus:shadow-error-100",
            inputBorderColorStyle[String(isError)],
            inputVariantsStyle[inputVariant]
          )}
          disabled={disabled}
          aria-disabled={disabled}
          required={required}
          type={inputType}
          aria-label={ariaLabel}
          aria-describedby={`${ariaDescribedBy} ${ariaDescribedByError}`}
        />

        <Input.Icon isError={isError} {...props} />

        <Input.Prefix
          inputVariant={inputVariant}
          disabled={disabled}
          prefixText={prefixOrSuffixText}
          {...props}
        />
        <Input.Suffix
          inputVariant={inputVariant}
          disabled={disabled}
          suffixText={prefixOrSuffixText}
          {...props}
        />
        <Input.Text text={label} type="label" />

        {supportingText && !isError && (
          <Input.Text
            text={supportingText}
            type="supportingText"
            id={ariaDescribedBy}
          />
        )}
      </label>
      <div className={classNames(!supportingText && "h-6")}>
        {isError && (
          <Input.Text
            text={errorMessage}
            type="errorMessage"
            id={ariaDescribedByError}
            aria-live={ariaLive}
          />
        )}
      </div>
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
      options: [
        "default",
        "prefixText",
        "prefixDropdown",
        "prefixIcon",
        "suffixDropdown",
      ],
      description:
        "default | prefixText | prefixDropdown | prefixIcon | suffixDropdown",
    },
    prefixOrSuffixText: {
      description: "string",
    },
    inputType: {
      control: "select",
      options: ["text", "number", "email", "password"],
      description: "only examples: text | number | email | password",
    },
    tooltipIcon: {
      options: [undefined, "&#xea6b", "&#xea8a"],
      control: {
        type: "select",
        labels: { "&#xea6b": "help", "&#xea8a": "slash" },
      },
      description: "icon",
    },
    prefixIcon: {
      options: [undefined, "&#xea6b", "&#xea8a"],
      control: {
        type: "select",
        labels: { "&#xea6b": "help", "&#xea8a": "slash" },
      },
      description: "icon",
    },
    ariaLive: {
      control: "select",
      options: ["polite", "assertive", "off"],
      description: "polite | assertive | off",
    },
    ariaLabel: { description: "string" },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    supportingText: "Write here some tips",
    disabled: false,
    errorMessage: "",
    inputVariant: "default",
    prefixOrSuffixText: "https://",
    tooltipIcon: "&#xea6b",
    prefixIcon: "&#xea6b",
    inputType: "text",
    type: "text",
    ariaLive: "polite",
    ariaLabel: "",
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

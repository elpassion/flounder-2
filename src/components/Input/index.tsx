import classNames from "classnames";

import {
  SuffixProps,
  InputProps,
  PrefixProps,
  DropdownButtonProps,
  TextProps,
  IconProps,
} from "components/Input/Input.interface";
import * as InputComponents from "./";

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

export const Prefix: React.FC<PrefixProps> = ({
  inputVariant,
  prefixText,
  prefixIcon = "&#xea6b",
  isError,
  disabled,
}) => {
  const isPrefix =
    inputVariant === "prefixText" ||
    inputVariant === "prefixDropdown" ||
    inputVariant === "prefixIcon";

  const styleVariants = {
    prefixText: "bg-neutral-50 text-neutral-400 border-neutral-200",
    prefixDropdown: classNames(
      "relative bg-white",
      inputBorderColorStyle[String(isError)],
      focusColorStyle[String(isError)],
      "peer-focus:after:content'' peer-focus:after:absolute peer-focus:after:-right-2 peer-focus:after:-top-px peer-focus:after:h-[calc(100%+2px)] peer-focus:after:w-2 peer-focus:after:border-y peer-focus:after:bg-white"
    ),
    prefixIcon: classNames(
      "relative bg-white flex items-center",
      inputBorderColorStyle[String(isError)],
      focusColorStyle[String(isError)],
      "peer-focus:after:content'' peer-focus:after:absolute peer-focus:after:-right-2 peer-focus:after:-top-px peer-focus:after:h-[calc(100%+2px)] peer-focus:after:w-2 peer-focus:after:border-y peer-focus:after:bg-white"
    ),
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
        <InputComponents.DropdownButton text={prefixText} disabled={disabled} />
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
};
export const Suffix: React.FC<SuffixProps> = ({
  inputVariant,
  suffixText,
  isError,
  ...props
}) => {
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
      <InputComponents.DropdownButton text={suffixText} {...props} />
    </div>
  );
};
export const DropdownButton: React.FC<DropdownButtonProps> = ({
  text,
  disabled,
}) => (
  <button className="flex items-center gap-2" disabled={disabled}>
    <span>{text}</span>
    <span className="font-icons text-base">&#xeacb;</span>
  </button>
);
export const Text: React.FC<TextProps> = ({ text, type }) => {
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
};
export const Icon: React.FC<IconProps> = ({
  tooltipIcon,
  inputVariant,
  isError,
}) => {
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
        <span className="font-icons text-base text-error-500">&#xeb1b;</span>
      ) : (
        <span
          className="font-icons text-base"
          dangerouslySetInnerHTML={{ __html: `${tooltipIcon};` }}
        />
      )}
    </div>
  );
};

export const Input: React.FC<InputProps> = ({
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

  const gridTemplates = {
    default: "grid-cols-1",
    prefixText: "grid-cols-[auto_1fr]",
    prefixDropdown: "grid-cols-[auto_1fr]",
    prefixIcon: "grid-cols-[auto_1fr]",
    suffixDropdown: "grid-cols-[1fr_auto]",
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

        <InputComponents.Icon
          isError={isError}
          inputVariant={inputVariant}
          {...props}
        />

        <InputComponents.Prefix
          inputVariant={inputVariant}
          disabled={disabled}
          prefixText={prefixOrSuffixText}
          isError={isError}
          {...props}
        />
        <InputComponents.Suffix
          inputVariant={inputVariant}
          disabled={disabled}
          suffixText={prefixOrSuffixText}
          isError={isError}
          {...props}
        />
        <InputComponents.Text text={label} type="label" />

        {supportingText && !isError && (
          <InputComponents.Text
            text={supportingText}
            type="supportingText"
            id={ariaDescribedBy}
          />
        )}
      </label>
      <div className={classNames(!supportingText && "h-6")}>
        {isError && (
          <InputComponents.Text
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

export default Input;

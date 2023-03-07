import classNames from "classnames";

import {
  SuffixProps,
  InputProps,
  PrefixProps,
  DropdownButtonProps,
  TextProps,
  IconProps,
  BaseInputProps,
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

export const BaseInput: React.FC<BaseInputProps> = ({
  children,
  placeholder,
  isError = false,
  disabled,
  required,
  inputType,
  ariaLabel,
  ariaDescribedBy,
  ariaDescribedByError,
  className,
  onChange,
  helpIcon,
  suffixVariant,
  prefixVariant,
}) => {
  const inputVariant =
    !!suffixVariant && !!prefixVariant
      ? "withPrefixAndSuffix"
      : !!suffixVariant
      ? "withSuffix"
      : !!prefixVariant
      ? "withPrefix"
      : "default";

  const inputVariantStyles = {
    default: "",
    withSuffix: "rounded-r-none border-r-0",
    withPrefix: "rounded-l-none border-l-0",
    withPrefixAndSuffix: "border-x-0 !rounded-none",
  };

  // @TODO: Add special sizes to config and ditch JIT to keep design system consistent embeded into config
  const containerVariantsStyle = {
    default: "grid-cols-1",
    withSuffix: "grid-cols-[1fr_auto]",
    withPrefix: "grid-cols-[auto_1fr]",
    withPrefixAndSuffix: "grid-cols-[auto_1fr_auto]",
  };
  return (
    <label
      className={classNames(
        "relative grid gap-y-1.5",
        containerVariantsStyle[inputVariant]
      )}
    >
      <input
        placeholder={placeholder}
        className={classNames(
          "peer row-start-2 w-full rounded-lg border bg-white py-2 pl-3.5 pr-10 text-neutral-900",
          "placeholder:text-neutral-400",
          "disabled:bg-neutral-50 disabled:placeholder:text-neutral-200",
          "focus:shadow-focused focus:shadow-secondary-50 focus:outline-none focus:ring-0 focus:placeholder:text-white",
          isError && "focus:shadow-focused focus:shadow-error-100",
          inputBorderColorStyle[String(isError)],
          inputVariantStyles[inputVariant],
          className
        )}
        disabled={disabled}
        aria-disabled={disabled}
        required={required}
        type={inputType}
        aria-label={ariaLabel}
        aria-describedby={`${ariaDescribedBy} ${ariaDescribedByError}`}
        onChange={onChange}
      />
      <InputComponents.Icon isError={isError} helpIcon={helpIcon} />
      {children}
    </label>
  );
};

export const Prefix: React.FC<PrefixProps> = ({
  prefixVariant,
  prefixText = "",
  prefixIcon = "&#xea6b",
  isError = false,
  disabled,
  className,
  iconClassName,
}) => {
  const isPrefix = !!prefixVariant;

  const styleVariants = {
    text: "bg-neutral-50 text-neutral-400 border-neutral-200 border-r",
    dropdown: classNames(
      "relative bg-white",
      inputBorderColorStyle[String(isError)],
      focusColorStyle[String(isError)]
    ),
    icon: classNames(
      "relative bg-white flex items-center text-xl",
      inputBorderColorStyle[String(isError)],
      focusColorStyle[String(isError)]
    ),
  };

  if (!isPrefix) return <></>;

  return (
    <div
      className={classNames(
        "col-end-2 row-start-2 rounded-l-lg border border-r-0 py-2.5 pl-3.5 !pr-0",
        styleVariants[prefixVariant],
        "peer-disabled:bg-neutral-50 peer-disabled:text-neutral-200",
        className
      )}
      style={{ clipPath: "inset(-5px 0px -5px -5px)" }}
    >
      {prefixVariant === "text" && <span className="pr-3.5">{prefixText}</span>}
      {prefixVariant === "dropdown" && (
        <InputComponents.DropdownButton text={prefixText} disabled={disabled} />
      )}
      {prefixVariant === "icon" && (
        <span
          className={classNames(
            "font-icons",
            disabled ? "text-neutral-200" : "text-neutral-400",
            iconClassName
          )}
          dangerouslySetInnerHTML={{ __html: `${prefixIcon};` }}
        />
      )}
    </div>
  );
};
export const Suffix: React.FC<SuffixProps> = ({
  suffixVariant,
  suffixText,
  isError = false,
  className,
  ...props
}) => {
  if (!suffixVariant) return <></>;

  return (
    <div
      className={classNames(
        "relative row-start-2 rounded-r-lg border border-l-0 bg-white py-2.5 pr-3.5 !pl-0 text-neutral-900",
        "peer-disabled:bg-neutral-50 peer-disabled:text-neutral-200",
        inputBorderColorStyle[String(isError)],
        focusColorStyle[String(isError)],
        className
      )}
      style={{ clipPath: "inset(-5px -5px -5px 0px)" }}
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
  helpIcon,
  isError,
  onIconClick,
}) => {
  if (!helpIcon) return <></>;

  return (
    <div
      className={classNames(
        "absolute right-3.5 col-end-3 row-start-2 row-end-3 flex h-full cursor-pointer items-center text-neutral-300",
        "peer-disabled:text-neutral-200"
      )}
      onClick={onIconClick}
    >
      {isError ? (
        <span className="font-icons text-base text-error-500">&#xeb1b;</span>
      ) : (
        <span
          className="font-icons text-base"
          dangerouslySetInnerHTML={{ __html: `${helpIcon};` }}
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
  inputType = "text",
  prefixOrSuffixText = "",
  ariaLive,
  ariaDescribedBy,
  ariaDescribedByError,
  helpIcon,
  ...props
}) => {
  const isError = !!errorMessage;

  return (
    <>
      <BaseInput
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        isError={isError}
        inputType={inputType}
        ariaDescribedBy={ariaDescribedBy}
        ariaDescribedByError={ariaDescribedByError}
        helpIcon={helpIcon}
        {...props}
      >
        <InputComponents.Prefix
          disabled={disabled}
          prefixText={prefixOrSuffixText}
          isError={isError}
          {...props}
        />
        <InputComponents.Suffix
          disabled={disabled}
          suffixText={prefixOrSuffixText}
          isError={isError}
          {...props}
        />
        {label && <InputComponents.Text text={label} type="label" />}

        {supportingText && !isError && (
          <InputComponents.Text
            text={supportingText}
            type="supportingText"
            id={ariaDescribedBy}
          />
        )}
      </BaseInput>
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

import classNames from "classnames";
import CheckSvg from "../../svgs/CheckSvg";
import type { CheckboxProps } from "./Checkbox.interface";

export const Checkbox: React.FC<CheckboxProps> = ({
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
  className,
  ariaLabel,
  ariaDescribedBy,
  labelClassName,
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

  return (
    <>
      <div
        className={classNames(
          "group relative flex w-fit items-center gap-2",
          {
            "flex-row-reverse": labelPosition === "left",
            // @TODO: Add special sizes to config and ditch JIT to keep design system consistent embeded into config
            // Also not a good idea to make it max-width if we want to make it reusable in different forms/pages/cases
            "w-full max-w-[344px] justify-between":
              supportingText && labelPosition === "left",
          },
          fontColor,
          className
        )}
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          className={classNames(
            "peer absolute mt-1.5 cursor-pointer border-0 p-0 opacity-0",
            "disabled:cursor-default",
            sizeVariants[size]
          )}
          disabled={disabled}
          aria-disabled={disabled}
          aria-label={ariaLabel}
          defaultChecked={checked}
          required={required}
          onChange={onChange}
          aria-describedby={ariaDescribedBy}
        />
        <div
          className={classNames(
            "flex flex-shrink-0 items-center justify-center rounded border  bg-white text-transparent",
            "group-hover:bg-primary-50",
            "peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-500",
            "peer-focus:border-primary-500 peer-focus:ring peer-focus:ring-primary-50",
            "peer-disabled:border-neutral-50 peer-disabled:bg-neutral-100 peer-disabled:peer-checked:text-neutral-50",
            sizeVariants[size],
            error ? "border-error-500" : "border-neutral-300",
            error && "group-hover:bg-inherit",
            error &&
              "peer-checked:border-error-500 peer-checked:bg-error-50 peer-checked:text-error-500",
            error && "peer-focus:border-error-500 peer-focus:ring-0"
          )}
        >
          <CheckSvg className="block aspect-square w-3/5" />
        </div>
        <div
          className={classNames("peer-disabled:text-neutral-200", fontColor)}
        >
          {labelText && (
            <label
              htmlFor={name}
              className={classNames(
                "flex items-center gap-1 font-medium",
                disabled ? "cursor-default" : "cursor-pointer",
                fontSizeVariants[size],
                labelClassName
              )}
            >
              {labelText}
              {required === true && <span className="self-start">*</span>}
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
                fontSizeVariants[size]
              )}
              id={ariaDescribedBy}
            >
              {supportingText}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkbox;

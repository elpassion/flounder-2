import classNames from "classnames";

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
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const Radio: React.FC<RadioProps> = ({
  name,
  id,
  checked,
  disabled,
  error,
  size = "md",
  onChange,
  labelPosition,
  labelText,
  supportingText,
  className,
  ariaLabel,
  ariaDescribedBy,
}) => {
  const isMediumSize = size === "md";
  const fontColor = error ? "text-error-500" : "text-neutral-500";
  const fontSizeVariants = {
    sm: "text-sm",
    md: "text-base",
  };

  return (
    <>
      <div
        className={classNames(
          "group flex w-fit items-baseline gap-2",
          fontColor,
          {
            "flex-row-reverse": labelPosition === "left",
            "min-w-min max-w-full justify-between":
              supportingText && labelPosition === "left",
          },
          className
        )}
      >
        <input
          type="radio"
          id={id}
          name={name}
          className="peer absolute h-4 w-4 cursor-pointer opacity-0 disabled:cursor-default"
          disabled={disabled}
          aria-disabled={disabled}
          checked={checked}
          onChange={onChange}
          aria-describedby={ariaDescribedBy}
          aria-label={ariaLabel}
        />
        <div
          className={classNames(
            "after:content'' flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border bg-white text-transparent group-hover:bg-primary-50",
            "after:h-1.5 after:w-1.5 after:rounded-full",
            "peer-disabled:border-neutral-200 group-hover:peer-disabled:bg-white peer-disabled:peer-checked:border-neutral-50 peer-disabled:peer-checked:bg-neutral-100 peer-disabled:peer-checked:after:bg-neutral-50",
            error ? "border-error-500" : "border-neutral-300",
            error && "group-hover:bg-inherit",
            error
              ? "peer-checked:border-error-500 peer-checked:bg-error-50 peer-checked:after:bg-error-500"
              : "peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:after:bg-primary-500",
            error
              ? "peer-focus:border-error-500 peer-focus:ring-0"
              : "peer-focus:border-primary-500 peer-focus:ring peer-focus:ring-primary-50",
            isMediumSize && "h-5 w-5 after:h-2 after:w-2"
          )}
        ></div>
        <div
          className={classNames("peer-disabled:text-neutral-200", fontColor)}
        >
          {labelText && (
            <label
              htmlFor={id}
              className={classNames(
                "font-medium",
                disabled ? "cursor-default" : "cursor-pointer",
                fontSizeVariants[size]
              )}
            >
              {labelText}
            </label>
          )}
          {supportingText && (
            <p
              className={classNames("font-normal", fontSizeVariants[size])}
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

export default Radio;

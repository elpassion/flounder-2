import classNames from "classnames";
import type { ToggleProps } from "./Toggle.interface";

export const Toggle: React.FC<ToggleProps> = ({
  size = "sm",
  labelText,
  supportingText,
  disabled,
  className,
  ariaLabel,
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
          aria-disabled={disabled}
          aria-describedby="help"
          aria-label={ariaLabel}
          role="switch"
        />
        <span
          className={classNames(
            "flex flex-shrink-0 cursor-pointer items-center rounded-full bg-neutral-100 p-0.5 opacity-100 duration-300 ease-in-out",
            "after:rounded-full after:bg-white after:shadow-sm after:duration-300",
            "hover:bg-neutral-200",
            "peer-checked:bg-primary-500",
            "peer-disabled:cursor-not-allowed peer-disabled:after:bg-neutral-200 peer-disabled:hover:bg-neutral-100",
            sizeVariant[size],
            className
          )}
        ></span>
        {labelText && (
          <span
            className={classNames(
              "ml-2 flex cursor-pointer flex-col font-medium text-neutral-600",
              "peer-disabled:cursor-not-allowed peer-disabled:text-neutral-300",
              fontSizeVariant[size]
            )}
          >
            {labelText}
            {supportingText && (
              <span
                className={classNames(
                  "mt-0.5 flex font-normal",
                  fontSizeVariant[size]
                )}
                aria-describedby="help"
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

export default Toggle;

import classNames from "classnames";
import type { TooltipProps } from "./Tooltip.interface";

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  supportingText,
  position = "top",
  variant = "white",
  className,
}) => {
  const positionVariants = {
    top: "before:-top-2 before:right-1/2 before:translate-x-1/2 before:shadow-tooltipTop",
    right:
      "before:-right-2 before:bottom-1/2 before:translate-y-1/2 before:shadow-tooltipRight",
    bottom:
      "before:-bottom-2 before:right-1/2 before:translate-x-1/2 before:shadow-tooltipBottom",
    left: "before:-left-2 before:bottom-1/2 before:translate-y-1/2 before:shadow-tooltipLeft",
  };

  const colorVariants = {
    white:
      "border-neutral-50 bg-white text-neutral-900 before:border-neutral-50 before:bg-white",
    dark: "border-neutral-50 bg-neutral-600 text-white before:border-neutral-50 before:bg-neutral-600",
  };

  const supportingTextColorVariants = {
    white: "text-neutral-600",
    dark: "text-neutral-100",
  };

  return (
    <div
      role="tooltip"
      className={classNames(
        "relative flex w-fit max-w-xs flex-col gap-1.5 rounded border py-2 px-3 text-xs shadow-tooltip",
        "before:content'' before:absolute before:h-4 before:w-4 before:rotate-[135deg] before:rounded-px",
        positionVariants[position],
        colorVariants[variant],
        className
      )}
    >
      <p className="font-medium">{text}</p>
      {supportingText && (
        <p
          className={classNames(
            "min-w-min",
            supportingTextColorVariants[variant]
          )}
        >
          {supportingText}
        </p>
      )}
    </div>
  );
};

export default Tooltip;

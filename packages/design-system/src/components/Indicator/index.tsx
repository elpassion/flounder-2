import classNames from "classnames";
import * as IndicatorComponents from "./";
import type {
  IndicatorComponentsProps,
  IndicatorProps,
  IndicatorWrapperProps,
} from "./Indicator.interface";

const indicatorDotTypes = {
  default: "bg-neutral-100 text-neutral-900",
  error: "bg-error-500 text-white",
  warning: "bg-orange-500 text-white",
  processing: "bg-blue-500 text-white",
  success: "bg-green-500 text-white",
};

export const Wrapper: React.FC<IndicatorWrapperProps> = ({
  children,
  variant,
  type,
}) => {
  const indicatorTypes = {
    default: "bg-neutral-50",
    error: "bg-error-100 text-error-900",
    warning: "bg-orange-100 text-orange-900",
    processing: "bg-blue-50 text-blue-900",
    success: "bg-green-100 text-green-900",
  };
  const indicatorWrapperTypes = {
    badge: classNames(
      "inline-flex items-center gap-x-1.5 rounded-full py-1 py-1 px-2.5 text-xs font-medium",
      indicatorTypes[type]
    ),
    count: classNames(
      "inline-flex h-6 w-6 min-w-fit shrink-0 justify-center rounded-full border-2 border-solid border-white px-1 text-sm font-medium shadow-lg",
      indicatorDotTypes[type]
    ),
    default: `inline-flex items-center gap-x-1.5 text-sm font-medium`,
  };

  return <div className={indicatorWrapperTypes[variant]}>{children}</div>;
};
export const Dot: React.FC<IndicatorComponentsProps> = ({ type, variant }) => {
  const indicatorDotSizeTypes = {
    badge: "h-2 w-2",
    default: "h-3 w-3",
    count: "",
  };

  return (
    <span
      className={classNames(
        "flex shrink-0 rounded-full",
        indicatorDotTypes[type],
        indicatorDotSizeTypes[variant]
      )}
    />
  );
};

export const Indicator: React.FC<IndicatorProps> = ({
  variant,
  type,
  text,
  number,
}) => {
  return (
    <IndicatorComponents.Wrapper variant={variant} type={type}>
      {variant !== "count" && (
        <IndicatorComponents.Dot variant={variant} type={type} />
      )}
      <span>{variant === "count" ? number : text}</span>
    </IndicatorComponents.Wrapper>
  );
};

export default Indicator;

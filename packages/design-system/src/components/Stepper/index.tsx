import classNames from "classnames";
import CheckSvg from "../../svgs/CheckSvg";
import * as StepperComponents from "./";
import Icon from "../Icon";
import { StepStatuses } from "./Stepper.interface";
import type {
  ContainerProps,
  StepProps,
  TitleSectionProps,
} from "./Stepper.interface";

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <ol className={classNames("flex justify-between gap-2", className)}>
      {children}
    </ol>
  );
};

const stepStatusStyle = {
  complete:
    "bg-primary-500 text-white border-primary-500 hover:bg-primary-600 hover:border-primary-600 focus:bg-primary-700 focus:border-primary-700",
  current:
    "bg-primary-500 text-white shadow-focused shadow-primary-50 border-primary-500 hover:bg-primary-600 hover:border-primary-600 focus:bg-primary-700 focus:border-primary-700",
  incomplete:
    "bg-neutral-50 text-neutral-300 border-neutral-50 hover:bg-neutral-100 hover:border-neutral-100 focus:bg-white focus:border-neutral-100",
};
const sizeVariants = {
  sm: "w-6 h-6 text-xs p-1",
  md: "w-8 h-8 text-sm p-2",
  lg: "w-11 h-11 text-base p-2.5",
};

export const Step: React.FC<StepProps> = ({
  index,
  status,
  size = "md",
  completeVariant = "default",
  className,
  icon,
  onClick,
  stepTitle,
  stepDescription,
  variant,
}) => {
  const renderContent = (index: number, status: StepStatuses) => {
    if (completeVariant === "check" && status === StepStatuses.COMPLETE) {
      return <CheckSvg className="block aspect-square w-4/5" />;
    }
    return icon ? <Icon icon={icon} /> : <>{`${index + 1}`}</>;
  };

  return (
    <div className={classNames("flex gap-3", className)}>
      <button
        className={classNames(
          "flex items-center justify-center rounded-full border",
          stepStatusStyle[status],
          sizeVariants[size]
        )}
        onClick={onClick}
      >
        {renderContent(index, status)}
      </button>
      <StepperComponents.TitleSection
        status={status}
        size={size}
        stepTitle={stepTitle}
        stepDescription={stepDescription}
        variant={variant}
      />
    </div>
  );
};

const titleStatusColorVariants = {
  complete: "text-neutral-700",
  current: "text-primary-800",
  incomplete: "text-neutral-400",
};
const descriptionStatusColorVariants = {
  complete: "text-neutral-500",
  current: "text-primary-700",
  incomplete: "text-neutral-300",
};
const titleSizeVariants = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};
const sizeMarginVariants = {
  sm: "",
  md: "mt-1",
  lg: "mt-2",
};
const stepperVariantsStyle = {
  horizontal: "items-center",
  vertical: "",
};

export const TitleSection: React.FC<TitleSectionProps> = ({
  stepTitle,
  stepDescription,
  status,
  size = "md",
  variant,
}) => {
  const mobileHorizontalStyles = variant === "horizontal" && "hidden sm:block";

  return (
    <div
      className={classNames(
        "flex flex-col whitespace-nowrap",
        stepperVariantsStyle[variant]
      )}
    >
      <p
        className={classNames(
          "text-sm font-medium empty:hidden",
          titleStatusColorVariants[status],
          titleSizeVariants[size],
          mobileHorizontalStyles,
          variant === "vertical" && sizeMarginVariants[size]
        )}
      >
        {stepTitle}
      </p>
      <p
        className={classNames(
          "text-sm empty:hidden",
          descriptionStatusColorVariants[status],
          mobileHorizontalStyles
        )}
      >
        {stepDescription}
      </p>
    </div>
  );
};

import classNames from "classnames";
import * as StepperComponents from "./";
import { StepStatuses } from "./Stepper.interface";
import type { StepperProps } from "./Stepper.interface";

export const VerticalStepper: React.FC<StepperProps> = ({
  activeStep,
  steps,
  size = "md",
  completeVariant,
  onClick,
}) => {
  // @TODO: Add special sizes to config and ditch JIT to keep design system consistent embeded into config
  const connectorSizeVariants = {
    sm: "after:h-[calc(100%-32px)] after:left-[11px] after:-top-[calc(50%-8px)]",
    md: "after:h-[calc(100%-40px)] after:left-[15px] after:-top-[calc(50%-12px)]",
    lg: "after:h-[calc(100%-52px)] after:left-[21px] after:-top-[calc(50%-18px)]",
  };

  const connectorStatusColorVariants = {
    complete: "after:border-primary-500",
    current: "after:border-primary-500",
    incomplete: "after:border-neutral-100",
  };

  const getStatus = (index: number): StepStatuses => {
    if (index < activeStep) return StepStatuses.COMPLETE;
    else if (index === activeStep) return StepStatuses.CURRENT;
    else return StepStatuses.INCOMPLETE;
  };

  return (
    <StepperComponents.Container className="min-h-[400px] w-min flex-col">
      {steps.map(({ id, ...step }, index) => {
        const stepStatus = getStatus(index);
        return (
          <li
            className={classNames(
              "relative w-full flex-1",
              "after:absolute after:w-px after:translate-y-[-50%] after:border-l-2 first:after:hidden",
              connectorStatusColorVariants[stepStatus],
              connectorSizeVariants[size]
            )}
            key={id}
          >
            <StepperComponents.Step
              {...step}
              status={stepStatus}
              index={index}
              size={size}
              completeVariant={completeVariant}
              onClick={onClick}
              variant="vertical"
            />
          </li>
        );
      })}
    </StepperComponents.Container>
  );
};

export default VerticalStepper;

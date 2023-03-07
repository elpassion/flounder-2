import classNames from "classnames";

import { StepperProps, StepStatuses } from "./Stepper.interface";
import * as StepperComponents from "components/Stepper";

export const HorizontalStepper: React.FC<StepperProps> = ({
  activeStep,
  steps,
  size = "md",
  completeVariant,
  onClick,
}) => {
  // @TODO: Add special sizes to config and ditch JIT to keep design system consistent embeded into config
  const connectorSizeVariants = {
    sm: "after:-left-[calc(50%-20px)] after:top-2.5 after:w-[calc(100%-48px)]",
    md: "after:-left-[calc(50%-20px)] after:top-4 after:w-[calc(100%-48px)]",
    lg: "after:-left-[calc(50%-28px)] after:top-5 after:w-[calc(100%-64px)]",
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
    <StepperComponents.Container>
      {steps.map(({ id, ...step }, index) => {
        const stepStatus = getStatus(index);
        return (
          <li
            className={classNames(
              "relative w-full flex-1",
              "after:absolute after:h-px after:border-b-2 first:after:hidden",
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
              className="flex-col items-center"
              variant="horizontal"
            />
          </li>
        );
      })}
    </StepperComponents.Container>
  );
};

export default HorizontalStepper;

import type { IconTypes } from "utils/iconType";

type Sizes = "sm" | "md" | "lg";
type StepperVariants = "horizontal" | "vertical";

interface StepInterface {
  id: string | number;
  icon?: IconTypes;
  stepTitle?: string;
  stepDescription?: string;
}

export enum StepStatuses {
  COMPLETE = "complete",
  CURRENT = "current",
  INCOMPLETE = "incomplete",
}

export interface ContainerProps extends React.PropsWithChildren {
  className?: string;
}

export interface TitleSectionProps {
  stepTitle?: string;
  stepDescription?: string;
  size?: Sizes;
  variant: StepperVariants;
  status: StepStatuses;
}

export interface StepProps
  extends Pick<
    TitleSectionProps,
    "stepTitle" | "stepDescription" | "size" | "variant"
  > {
  index: number;
  status: StepStatuses;
  onClick?: () => void;
  icon?: IconTypes;
  completeVariant?: "default" | "check";
  className?: string;
}

export interface StepperProps
  extends Pick<StepProps, "size" | "onClick" | "completeVariant"> {
  steps: StepInterface[];
  activeStep: number;
}

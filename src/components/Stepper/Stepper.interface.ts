import { IconTypes } from "utils/iconType";

type Sizes = "sm" | "md" | "lg";

interface StepInterface {
  id: string | number;
  stepTitle?: string;
  stepDescription?: string;
}

export enum StepStatuses {
  COMPLETE = "complete",
  CURRENT = "current",
  INCOMPLETE = "incomplete",
}

export interface TitleSectionProps {
  stepTitle?: string;
  stepDescription?: string;
  size?: Sizes;
  status: StepStatuses;
  className?: string;
}

export interface StepProps
  extends Pick<TitleSectionProps, "stepTitle" | "stepDescription" | "size"> {
  index: number;
  status: StepStatuses;
  onClick?: () => void;
  icon?: IconTypes;
  completeVariant?: "default" | "check";
  className?: string;
}

export interface StepperProps
  extends Pick<StepProps, "size" | "onClick" | "icon" | "completeVariant"> {
  steps: StepInterface[];
  activeStep: number;
}

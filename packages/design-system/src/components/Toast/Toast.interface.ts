import type { IconTypes } from "../../utils/iconType";

export interface ToastChildrenProps extends React.PropsWithChildren {
  className?: string;
}

export interface CloseButtonProps {
  onClose?: () => void;
  className?: string;
}

export interface IconToastProps {
  icon: IconTypes;
  className?: string;
}

export interface TextToastProps extends ToastChildrenProps {
  textType: "title" | "description";
}

export interface ActionToastProps extends ToastChildrenProps {
  onClick?: () => void;
}

export interface CloseSectionProps
  extends ToastChildrenProps,
    CloseButtonProps {}

export interface ActionSectionProps extends ActionToastProps {
  firstActionText?: string;
  secondActionText?: string;
  firstActionOnClick?: () => void;
  secondActionOnClick?: () => void;
}

export interface ContainerProps extends React.PropsWithChildren {
  className?: string;
}

export interface ToastProps extends ActionToastProps, CloseButtonProps {
  title?: string;
  description?: string;
  icon?: IconTypes;
  firstActionText?: string;
  secondActionText?: string;
  sectionVariants?: "close" | "action";
  backgroundColor?: string;
}

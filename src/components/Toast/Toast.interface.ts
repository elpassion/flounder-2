type ToastVariants = "default" | "small";

export interface ToastChildrenProps extends React.PropsWithChildren {
  variant: ToastVariants;
}

export interface CloseButtonProps {
  onClose?: () => void;
}

export interface IconToastProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
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
}

export interface BaseToastProps
  extends ToastChildrenProps,
    ActionSectionProps,
    CloseSectionProps {
  sectionVariants?: "close" | "action";
  backgroundColor?: string;
}

export interface ToastProps extends ActionToastProps, CloseButtonProps {
  title?: string;
  description?: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  firstActionText?: string;
  secondActionText?: string;
}

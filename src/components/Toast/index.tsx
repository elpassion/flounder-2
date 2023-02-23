import classNames from "classnames";
import {
  ActionSectionProps,
  ActionToastProps,
  CloseButtonProps,
  CloseSectionProps,
  ContainerProps,
  IconToastProps,
  TextToastProps,
} from "./Toast.interface";

export const ToastComponents = {
  Action: ({ children, onClick, className }: ActionToastProps) => {
    return (
      <button className={classNames("text-sm", className)} onClick={onClick}>
        {children}
      </button>
    );
  },
  ActionsSection: ({
    firstActionText,
    secondActionText,
    firstActionOnClick,
    secondActionOnClick,
  }: ActionSectionProps) => {
    const actionStyle =
      "w-full flex-1 border-l border-neutral-100 px-6 [&:nth-child(2)]:border-t";
    return (
      <>
        <div className="flex h-full flex-col">
          {firstActionText && (
            <ToastComponents.Action
              onClick={firstActionOnClick}
              className={classNames(
                "text-primary-500 hover:text-primary-600",
                actionStyle
              )}
            >
              {firstActionText}
            </ToastComponents.Action>
          )}
          {secondActionText && (
            <ToastComponents.Action
              onClick={secondActionOnClick}
              className={classNames("hover:text-neutral-600", actionStyle)}
            >
              {secondActionText}
            </ToastComponents.Action>
          )}
        </div>
      </>
    );
  },
  CloseButton: ({ onClose }: CloseButtonProps) => (
    <button onClick={onClose} aria-label="close">
      <span className="font-icons text-2xl">&#xea1d;</span>
    </button>
  ),
  CloseButtonSection: ({ onClose }: CloseSectionProps) => {
    return (
      <div className="p-2">
        <ToastComponents.CloseButton onClose={onClose} />
      </div>
    );
  },
  Container: ({ children, className }: ContainerProps) => {
    return (
      <div className={classNames("rounded-lg shadow-xl", className)}>
        {children}
      </div>
    );
  },
  Icon: ({ icon }: IconToastProps) => (
    <span
      className="font-icons text-xl"
      dangerouslySetInnerHTML={{ __html: `${icon};` }}
    />
  ),
  Text: ({ children, textType, className }: TextToastProps) => {
    const textTypeVariants = {
      title: "text-sm font-medium",
      description: "text-xs font-normal",
    };

    return (
      <p
        className={classNames(
          "empty:hidden",
          textTypeVariants[textType],
          className
        )}
      >
        {children}
      </p>
    );
  },
};

import classNames from "classnames";
import * as ToastComponents from "./";
import Icon from '../Icon';
import type {
  ActionSectionProps,
  ActionToastProps,
  CloseButtonProps,
  CloseSectionProps,
  ContainerProps,
  TextToastProps,
} from "./Toast.interface";

export const Action: React.FC<ActionToastProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button className={classNames("text-sm", className)} onClick={onClick}>
      {children}
    </button>
  );
};

export const ActionsSection: React.FC<ActionSectionProps> = ({
  firstActionText,
  secondActionText,
  firstActionOnClick,
  secondActionOnClick,
}) => {
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
};
export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => (
  <button onClick={onClose} aria-label="close">
    <Icon size="lg" icon="&#xea1d"/>
  </button>
);

export const CloseButtonSection: React.FC<CloseSectionProps> = ({
  onClose,
}) => {
  return (
    <div className="p-2">
      <ToastComponents.CloseButton onClose={onClose} />
    </div>
  );
};
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames("rounded-lg shadow-xl", className)}>
      {children}
    </div>
  );
};

export const Text: React.FC<TextToastProps> = ({
  children,
  textType,
  className,
}) => {
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
};

import classNames from "classnames";
import Icon from "../Icon";
import * as ToastComponents from "./";
import type { ToastProps } from "./Toast.interface";

export const SmallToast: React.FC<ToastProps> = ({
  title,
  description,
  icon,
  firstActionText,
  secondActionText,
  sectionVariants,
  backgroundColor,
  onClose,
}) => {
  return (
    <ToastComponents.Container
      className={classNames(
        "flex w-max min-w-min max-w-xs gap-2 py-3.5 pl-4 text-white ",
        sectionVariants === "close"
          ? "justify-between pr-2"
          : "justify-center pr-4",
        backgroundColor
      )}
    >
      <div className="flex gap-2">
        {icon && <Icon size="md" icon={icon} />}
        <div className="flex flex-col">
          {title && (
            <div className="flex gap-4">
              <ToastComponents.Text textType="title">
                {title}
              </ToastComponents.Text>

              {firstActionText && (
                <ToastComponents.Action className="w-fit underline">
                  {firstActionText}
                </ToastComponents.Action>
              )}
              {secondActionText && (
                <ToastComponents.Action className="w-fit underline">
                  {secondActionText}
                </ToastComponents.Action>
              )}
            </div>
          )}
          <ToastComponents.Text textType="description">
            {description}
          </ToastComponents.Text>
        </div>
      </div>
      {sectionVariants === "close" && (
        <ToastComponents.CloseButton onClose={onClose} />
      )}
    </ToastComponents.Container>
  );
};

export default SmallToast;

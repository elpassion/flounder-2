import classNames from "classnames";

import { IconTypes } from "../../utils/iconType";

// TODO: replace variant with interface
export interface InlineMessageProps {
  icon?: IconTypes;
  text: string;
  variant?: "default" | "success" | "warning" | "info" | "error";
  className?: string;
}

export const InlineMessage: React.FC<InlineMessageProps> = ({
  text,
  icon,
  variant = "default",
  className,
}) => {
  const inlineMessageStyleVariants = {
    default: "bg-inlineMessage text-inlineMessage",
    success: "bg-inlineMessage-success text-inlineMessage-success",
    warning: "bg-inlineMessage-warning text-inlineMessage-warning",
    info: "bg-inlineMessage-info text-inlineMessage-info",
    error: "bg-inlineMessage-error text-inlineMessage-error",
  };

  const iconColorVariants = {
    default: "text-neutral-900",
    success: "text-primary-500",
    warning: "text-orange-500",
    info: "text-blue-500",
    error: "text-error-500",
  };

  return (
    <div
      className={classNames(
        "flex items-center gap-2 rounded-lg p-3",
        inlineMessageStyleVariants[variant],
        className
      )}
    >
      {icon && (
        <div
          className={classNames(
            "flex h-4 w-4 items-center justify-center self-start",
            iconColorVariants[variant]
          )}
        >
          {icon}
        </div>
      )}

      <p className="text-xs font-medium">{text}</p>
    </div>
  );
};

export default InlineMessage;

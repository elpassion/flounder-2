import classNames from "classnames";
import type { InlineMessageProps } from "./InlineMessage.interface";

export const InlineMessage: React.FC<InlineMessageProps> = ({
  text,
  icon,
  variant = "default",
  className,
}) => {
  const inlineMessageStyleVariants = {
    default: "bg-neutral-50 text-neutral-900",
    success: "bg-primary-100 text-primary-900",
    warning: "bg-orange-100 text-orange-900",
    info: "bg-blue-100 text-blue-900",
    error: "bg-error-100 text-900",
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
      <div className={classNames("flex items-center justify-center self-start w-5 h-5", iconColorVariants[variant])}>
        {icon}
      </div>
      <p className="text-xs font-medium">{text}</p>
    </div>
  );
};

export default InlineMessage;

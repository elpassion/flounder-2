import classNames from "classnames";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showLabel?: boolean;
  label?: string;
  showSupportingText?: boolean;
  supportingText?: string;
  destructive?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  destructive,
  showLabel,
  showSupportingText,
  supportingText,
  label,
  disabled,
  ...props
}) => {
  const isLabel = showLabel && label;
  const isSupportingText = showSupportingText && supportingText;

  return (
    <div className="w-full">
      {isLabel && (
        <label
          htmlFor={props.id}
          className={classNames(
            "mb-1.5 block text-sm font-medium text-neutral-700",
            destructive && "text-error-500",
            disabled && "text-neutral-200"
          )}
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <textarea
          {...props}
          className={classNames(
            "block w-full rounded-lg border-neutral-200 transition-shadow placeholder:text-neutral-400 focus:border-neutral-200 focus:ring-4 focus:ring-secondary-50",
            destructive &&
              "border-red-500 focus:border-red-500 focus:ring-error-100",
            disabled &&
              "border-neutral-200 bg-neutral-50 placeholder-neutral-200"
          )}
          disabled={disabled}
        />
      </div>
      {isSupportingText && (
        <p
          className={classNames(
            "mt-1.5 text-sm text-neutral-400",
            disabled && "text-neutral-200",
            destructive && "text-red-500"
          )}
        >
          {supportingText}
        </p>
      )}
    </div>
  );
};

export default Textarea;

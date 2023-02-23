import classNames from "classnames";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  size: "sm" | "md" | "lg";
  variant: "filled" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({ text, size, variant }) => {
  const badgeSizeVariants = {
    sm: "text-xs px-4 py-1",
    md: "text-sm px-5 py-1.5",
    lg: "text-base px-4 py-2.5",
  };

  const badgeVariants = {
    filled: "bg-neutral-50",
    outline: "",
  };

  return (
    <span
      className={classNames(
        "rounded border border-solid border-neutral-200 font-semibold text-neutral-500",
        badgeSizeVariants[size],
        badgeVariants[variant]
      )}
    >
      {text}
    </span>
  );
};

export default Badge;

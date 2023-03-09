import classNames from "classnames";
import type { AnchorProps } from "./Anchor.interface";

export const Anchor: React.FC<AnchorProps> = ({
  text,
  link,
  decoration = "none",
  className,
  role,
}) => {
  const decorationVariants = {
    none: "text-primary-500 hover:text-primary-600 focus:text-primary-300",
    bottom:
      "border-b border-primary-500 text-primary-500 hover:text-primary-600 hover:border-primary-600 focus:text-primary-300 focus:border-primary-300",
    left: "border-l-2 px-4 py-2 border-neutral-100 text-neutral-400 hover:border-neutral-400 focus:border-neutral-600",
  };

  return (
    <a
      className={classNames(
        "text-sm",
        decorationVariants[decoration],
        className
      )}
      href={link}
      role={role}
    >
      {text}
    </a>
  );
};

export default Anchor;
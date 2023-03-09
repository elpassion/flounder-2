import classNames from "classnames";
import type { ContainerProps } from "./Items.interface";

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <button
      className={classNames(
        "cursor-pointer items-center rounded-lg border-transparent p-2 text-neutral-500",
        "hover:border-neutral-100 hover:bg-neutral-100",
        "active:border-neutral-200 active:bg-neutral-50",
        className
      )}
    >
      {children}
    </button>
  );
};


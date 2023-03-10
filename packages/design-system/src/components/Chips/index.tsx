import classNames from "classnames";
import type { ChipsProps } from "./Chips.interface";

export const Chips: React.FC<ChipsProps> = ({
  text,
  prefixIcon,
  suffixIcon,
}) => {
  return (
    <div
      className={classNames(
        "inline-flex cursor-pointer items-center gap-x-2 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-neutral-500 transition",
        "hover:bg-neutral-100",
        "active:border-neutral-100 active:bg-blue-500 active:text-white",
        "focus:border-blue-500 focus:bg-neutral-50"
      )}
    >
      {prefixIcon && (
        <div className="flex aspect-square w-4 items-center">{prefixIcon}</div>
      )}
      <span className="text-xs font-medium">{text}</span>
      {suffixIcon && (
        <div className="flex aspect-square w-4 items-center">{suffixIcon}</div>
      )}
    </div>
  );
};

export default Chips;

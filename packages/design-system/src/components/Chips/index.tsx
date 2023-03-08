import classNames from "classnames";
import type { ChipsProps } from "./Chips.interface";

const ChipsComponents = {
  BaseChips: ({ text, prefixIcon, suffixIcon }: ChipsProps) => {
    return (
      <div
        className={classNames(
          "inline-flex cursor-pointer items-center gap-x-2 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-neutral-500 transition",
          "hover:bg-neutral-100",
          "active:border-neutral-100 active:bg-blue-500 active:text-white",
          "focus:border-blue-500 focus:bg-neutral-50"
        )}
      >
        {prefixIcon && <ChipsComponents.PrefixIcon prefixIcon={prefixIcon} />}
        <span
          className={classNames(
            "text-xs font-medium",
            !prefixIcon && "ml-2.5",
            !suffixIcon && "mr-2.5"
          )}
        >
          {text}
        </span>
        {suffixIcon && <ChipsComponents.SuffixIcon suffixIcon={suffixIcon} />}
      </div>
    );
  },
  PrefixIcon: ({ prefixIcon }: Pick<ChipsProps, "prefixIcon">) => {
    return (
      <span
        className={classNames("w-4 text-center font-icons text-sm")}
        dangerouslySetInnerHTML={{ __html: `${prefixIcon};` }}
      />
    );
  },
  SuffixIcon: ({ suffixIcon }: Pick<ChipsProps, "suffixIcon">) => {
    return (
      <span
        className={classNames("w-4 text-center font-icons text-sm")}
        dangerouslySetInnerHTML={{ __html: `${suffixIcon};` }}
      />
    );
  },
};

export const Chips: React.FC<ChipsProps> = ({
  text,
  prefixIcon,
  suffixIcon,
}) => {
  return (
    <ChipsComponents.BaseChips
      text={text}
      prefixIcon={prefixIcon}
      suffixIcon={suffixIcon}
    />
  );
};

export default Chips;
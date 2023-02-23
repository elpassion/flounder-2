import classNames from "classnames";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  prefixIcon?: string;
  suffixIcon?: string;
}

const ChipComponents = {
  BaseChip: ({ text, prefixIcon, suffixIcon }: ChipProps) => {
    return (
      <div
        className={classNames(
          "inline-flex cursor-pointer items-center gap-x-2 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-neutral-500 transition hover:bg-neutral-100 focus:border-blue-500 focus:bg-neutral-50 active:border-neutral-100 active:bg-blue-500 active:text-white"
        )}
      >
        {prefixIcon && <ChipComponents.PrefixIcon prefixIcon={prefixIcon} />}
        <span
          className={classNames(
            "text-xs font-semibold",
            !prefixIcon && "ml-2.5",
            !suffixIcon && "mr-2.5"
          )}
        >
          {text}
        </span>
        {suffixIcon && <ChipComponents.SuffixIcon suffixIcon={suffixIcon} />}
      </div>
    );
  },
  PrefixIcon: ({ prefixIcon }: Pick<ChipProps, "prefixIcon">) => {
    return (
      <span
        className={classNames("w-4 text-center font-icons text-sm")}
        dangerouslySetInnerHTML={{ __html: `${prefixIcon};` }}
      />
    );
  },
  SuffixIcon: ({ suffixIcon }: Pick<ChipProps, "suffixIcon">) => {
    return (
      <span
        className={classNames("w-4 text-center font-icons text-sm")}
        dangerouslySetInnerHTML={{ __html: `${suffixIcon};` }}
      />
    );
  },
};

export const Chip: React.FC<ChipProps> = ({ text, prefixIcon, suffixIcon }) => {
  return (
    <ChipComponents.BaseChip
      text={text}
      prefixIcon={prefixIcon}
      suffixIcon={suffixIcon}
    />
  );
};

export default Chip;

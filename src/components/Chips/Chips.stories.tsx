import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  prefixIcon?: string;
  suffixIcon?: string;
}

export const Chip: ComponentStory<React.FC<ChipProps>> = ({
  text,
  prefixIcon,
  suffixIcon,
}) => {
  const Chip = {
    BaseChip: ({ text, prefixIcon, suffixIcon }: ChipProps) => {
      return (
        <div
          className={classNames(
            "inline-flex cursor-pointer items-center gap-x-2 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-neutral-500 transition hover:bg-neutral-100 focus:border-blue-500 focus:bg-neutral-50 active:border-neutral-100 active:bg-blue-500 active:text-white"
          )}
        >
          {prefixIcon && <Chip.PrefixIcon prefixIcon={prefixIcon} />}
          <span
            className={classNames(
              "text-xs font-semibold",
              !prefixIcon && "ml-2.5",
              !suffixIcon && "mr-2.5"
            )}
          >
            {text}
          </span>
          {suffixIcon && <Chip.SuffixIcon suffixIcon={suffixIcon} />}
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

  return (
    <Chip.BaseChip
      text={text}
      prefixIcon={prefixIcon}
      suffixIcon={suffixIcon}
    />
  );
};

export default {
  title: "Atoms/Chip",
  component: Chip,
  argTypes: {
    text: {
      description: "Enabled",
    },
    suffixIcon: {
      options: ["&#xeaf4", "&#xea65"],
      control: {
        type: "select",
        labels: {
          "&#xeaf4": "bookmark",
          "&#xea65": "trash",
        },
      },
      type: { required: true, name: "string" },
      description: "icon",
    },
    prefixIcon: {
      options: ["&#xeaf4", "&#xea65"],
      control: {
        type: "select",
        labels: {
          "&#xeaf4": "bookmark",
          "&#xea65": "trash",
        },
      },
      type: { required: true, name: "string" },
      description: "icon",
    },
  },
  args: {
    text: "Enabled",
    suffixIcon: "&#xeaf4",
    prefixIcon: "&#xea65",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2225%3A6724&t=MVA9T40duNaxfbWE-0",
    },
  },
} as ComponentMeta<React.FC<ChipProps>>;

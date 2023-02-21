import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";

interface ProgressBarProps {
  value: number;
  label: "none" | "right" | "bottom" | "topFloating" | "bottomFloating";
}

export const ProgressBar: ComponentStory<React.FC<ProgressBarProps>> = ({
  value,
  label,
}) => {
  const ProgressBar = {
    BaseProgressBar: ({ value, label }: ProgressBarProps) => {
      const progressBarLayoutVariants = {
        right: "flex items-center gap-x-2",
        bottom: "flex flex-col gap-y-2 items-end",
        topFloating: "relative pt-6",
        bottomFloating: "relative pb-6",
        none: "",
      };

      return (
        <div className={progressBarLayoutVariants[label]}>
          <div className="h-2 w-full rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-primary-500"
              style={{ width: `${value}%` }}
            />
          </div>
          {label !== "none" && (
            <ProgressBar.Label value={value} label={label} />
          )}
        </div>
      );
    },
    Label: ({ value, label }: ProgressBarProps) => {
      const progressBarLabelVariants = {
        right: "",
        bottom: "",
        topFloating:
          "absolute -top-2 text-neutral-500 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow",
        bottomFloating:
          "absolute -bottom-2 text-neutral-500 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow",
        none: "",
      };

      return (
        <div
          className={classNames(
            "text-xs font-semibold text-neutral-500",
            progressBarLabelVariants[label]
          )}
          style={{ left: `${value}%` }}
        >
          {value}%
        </div>
      );
    },
  };

  return <ProgressBar.BaseProgressBar value={value} label={label} />;
};

export default {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  argTypes: {
    value: {
      control: {
        type: "range",
        min: 0,
        max: 100,
      },
    },
    label: {
      control: {
        type: "select",
        options: ["none", "right", "bottom", "topFloating", "bottomFloating"],
      },
    },
  },
  args: {
    value: 50,
    label: "none",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3307%3A19117&t=OGq5t8JbqSEpLufw-0",
    },
  },
} as ComponentMeta<React.FC<ProgressBarProps>>;

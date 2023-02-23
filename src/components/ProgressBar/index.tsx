import classNames from "classnames";
import { ProgressBarProps } from "./ProgressBar.interface";

const ProgressBarComponents = {
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

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, label }) => {
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
        <ProgressBarComponents.Label value={value} label={label} />
      )}
    </div>
  );
};

export default ProgressBar;

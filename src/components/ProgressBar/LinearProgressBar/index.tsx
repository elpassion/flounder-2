import classNames from "classnames";
import * as LinearProgressBarComponents from ".";
import type { LinearProgressBarProps } from "./LinearProgressBar.interface";

export const Label: React.FC<LinearProgressBarProps> = ({
  progress,
  label,
}) => {
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
        "text-xs font-medium text-neutral-500",
        progressBarLabelVariants[label]
      )}
      style={{ left: `${progress}%` }}
    >
      {progress}%
    </div>
  );
};

export const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
  progress,
  label,
}) => {
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
          style={{ width: `${progress}%` }}
        />
      </div>
      {label !== "none" && (
        <LinearProgressBarComponents.Label progress={progress} label={label} />
      )}
    </div>
  );
};

export default LinearProgressBar;

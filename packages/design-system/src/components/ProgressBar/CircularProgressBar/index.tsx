import classNames from "classnames";
import type { CircularProgressBarProps } from "./CircularProgressBar.interface";

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  size,
  labelPosition,
  label,
  progress,
}) => {
  const pxThickness = {
    sm: 4,
    lg: 16,
  };

  const pxInnerDiameter = {
    sm: 58,
    lg: 144,
  };

  const thickness = size === "sm" ? pxThickness.sm : pxThickness.lg;

  const innerDiameter = size === "sm" ? pxInnerDiameter.sm : pxInnerDiameter.lg;
  const outerDiameter = innerDiameter + thickness * 2;

  const circleCenterCoordinate = outerDiameter / 2;
  const radius = circleCenterCoordinate - thickness / 2;

  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const sizeVariants = {
    sm: "w-smCircularProgress aspect-square",
    lg: "w-lgCircularProgress aspect-square",
  };

  const textSizeVariants = {
    sm: "text-base",
    lg: "text-2xl",
  };

  const isLabelOutsideVisible = size === "lg" && labelPosition === "outside";
  const isLabelInsideVisible = size === "lg" && labelPosition === "inside";

  return (
    <div>
      <div className="relative flex flex-col items-center">
        <svg
          className={classNames(
            "-rotate-90 text-neutral-100",
            sizeVariants[size]
          )}
        >
          <circle
            cx={circleCenterCoordinate}
            cy={circleCenterCoordinate}
            r={radius}
            strokeWidth={thickness}
            fill="transparent"
            stroke="currentColor"
          />
          <circle
            cx={circleCenterCoordinate}
            cy={circleCenterCoordinate}
            r={radius}
            strokeWidth={thickness}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            stroke="currentColor"
            className="text-primary-500"
          />
        </svg>
        <div
          className={classNames(
            "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center font-medium text-neutral-500",
            textSizeVariants[size]
          )}
        >
          {progress}%
          {isLabelInsideVisible && <span className="text-sm">{label}</span>}
        </div>
      </div>
      {isLabelOutsideVisible && (
        <div className="pt-2 text-center text-sm font-medium text-neutral-500">
          {label}
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;

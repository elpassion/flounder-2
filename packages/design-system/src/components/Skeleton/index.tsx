import classNames from "classnames";
import type {
  SkeletonCircleProps,
  SkeletonBarProps,
} from "./Skeleton.interface";

export const Circle = ({ size = 40, className }: SkeletonCircleProps) => (
  <div
    className={classNames(
      "animate-pulse rounded-full",
      { "bg-neutral-100": !className },
      className
    )}
    style={{ width: size, height: size }}
  />
);

export const Text = ({ height = 16, width, className }: SkeletonBarProps) => (
  <div
    className={classNames(
      "w-full animate-pulse rounded",
      { "bg-neutral-100": !className },
      className
    )}
    style={{ maxWidth: width, height: height }}
  />
);

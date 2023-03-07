import classNames from "classnames";
import type { SkeletonProps } from "./Skeleton.interface";


export const Circle = ({ height, width, className }: SkeletonProps) => (
  <div
    className={classNames(
      "rounded-full bg-neutral-100 h-10 w-10",
      height,
      width,
      className
    )}
  ></div>
);

export const Text = ({ height, width, className }: SkeletonProps) => (
  <div
    className={classNames("rounded bg-neutral-100 h-4 w-10", height, width, className)}
  ></div>
);

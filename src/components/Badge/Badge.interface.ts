import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  size: "sm" | "md" | "lg";
  variant: "filled" | "outline";
}

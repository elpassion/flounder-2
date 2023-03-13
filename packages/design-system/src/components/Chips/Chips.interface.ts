import type { HTMLAttributes, ReactNode } from "react";

export interface ChipsProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

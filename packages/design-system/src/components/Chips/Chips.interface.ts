import type { HTMLAttributes} from "react";

export interface ChipsProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  prefixIcon?: string;
  suffixIcon?: string;
}

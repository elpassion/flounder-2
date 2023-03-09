import type { HTMLAttributes } from "react";
import { IconTypes } from "../../utils/iconType";

export interface ChipsProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  prefixIcon?: IconTypes;
  suffixIcon?: IconTypes;
}

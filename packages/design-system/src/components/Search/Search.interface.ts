import type { BaseInputProps } from "../Input/Input.interface";

export interface SearchProps extends BaseInputProps {
  variant?: "default" | "withButton" | "withIconButton" | "inline";
  suffixText?: string;
}

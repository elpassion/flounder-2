export interface CircularProgressBarProps {
  size: "sm" | "lg";
  label?: string;
  labelPosition?: "inside" | "outside" | "none";
  progress: number;
}

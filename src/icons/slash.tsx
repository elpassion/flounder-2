import { IconProps } from "./Icons.interface";

export const SlashIcon: React.FC<IconProps> = ({ size = "md" }) => {
  return (
    <svg
      width={size === "lg" ? "24" : "16"}
      height={size === "lg" ? "24" : "16"}
      viewBox={size === "lg" ? "0 0 24 24" : "0 0 16 16"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={
          size === "lg"
            ? "M5.43 4.93L19.57 19.07M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12Z"
            : "M3.28659 3.28666L12.7133 12.7133M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33333 7.99992 1.33333C11.6818 1.33333 14.6666 4.3181 14.6666 8Z"
        }
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

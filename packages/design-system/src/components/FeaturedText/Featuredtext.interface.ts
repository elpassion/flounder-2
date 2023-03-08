import { TIcon } from "helpers/types";

export interface FeaturedTextProps {
  variant: TFeaturedTextVariant;
  align?: "center" | "left"; // default left
  size: TFeaturedTextSize;
  icon?: TIcon;
  title: string;
  content: string;
  linkedText: string;
  linkedUrl: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface FeaturedTextIconProps
  extends Omit<
    FeaturedTextProps,
    "align" | "title" | "content" | "linkedUrl" | "linkedText"
  > {}

export type TFeaturedTextSize = "sm" | "md" | "lg";
export type TFeaturedTextVariant = "text" | "iconTop" | "iconLeft";

import classNames from "classnames";
import ArrowRight from "../../svgs/ArrowRight";
import {
  FeaturedTextProps,
  TFeaturedTextSize,
  TFeaturedTextVariant,
} from "./Featuredtext.interface";

export const FeaturedText: React.FC<FeaturedTextProps> = ({
  title,
  content,
  variant,
  size = "md",
  align,
  linkedText,
  linkedUrl,
  icon,
}) => {
  const featuredTextVariants = {
    text: "",
    iconTop: "flex-col gap-y-4",
    iconLeft: "flex-row gap-x-6",
  };

  const featuredTextAlign = {
    left: "text-left",
    center: "items-center text-center",
  };

  const featuredTextTitleSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const learnMoreSizeVariants = {
    sm: "gap-x-3 text-sm",
    md: "gap-x-3 text-base",
    lg: "gap-x-5 text-lg",
  };

  const learnMoreIconSizes = {
    sm: "w-4 aspect-square",
    md: "w-4 aspect-square",
    lg: "w-6 aspect-square",
  };

  const iconWrapperSizes = {
    sm: "w-8 aspect-square",
    md: "w-10 aspect-square",
    lg: "w-12 aspect-square",
  };

  const textAlignment = featuredTextAlign[align || "left"];
  const isIconVariant = variant !== "text" && icon;

  const getFeaturedTextStyles = ({
    size,
    variant,
  }: {
    size: TFeaturedTextSize;
    variant: TFeaturedTextVariant;
  }): string => {
    switch (size) {
      case "sm":
        return "text-sm pb-3";
      case "lg":
        return variant === "text" ? "text-lg pb-4" : "text-base pb-6";
      case "md":
      default:
        return "text-base pb-4";
    }
  };

  return (
    <div
      className={classNames(
        "flex font-normal text-neutral-600",
        featuredTextVariants[variant],
        textAlignment
      )}
    >
      {isIconVariant && (
        <div className={classNames("flex-shrink-0", iconWrapperSizes[size])}>
          {icon}
        </div>
      )}
      <div className={classNames("flex flex-col", textAlignment)}>
        <h6
          className={classNames(
            "pb-2 font-medium",
            featuredTextTitleSizes[size]
          )}
        >
          {title}
        </h6>
        <p className={classNames(getFeaturedTextStyles({ size, variant }))}>
          {content}
        </p>
        <div
          className={classNames(
            "flex items-center font-medium text-primary-500",
            learnMoreSizeVariants[size]
          )}
        >
          <a href={linkedUrl}>{linkedText}</a>
          <ArrowRight className={learnMoreIconSizes[size]} />
        </div>
      </div>
    </div>
  );
};

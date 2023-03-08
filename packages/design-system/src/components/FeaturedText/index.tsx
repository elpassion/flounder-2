import classNames from "classnames";
import {
  FeaturedTextProps,
  TFeaturedTextSize,
  TFeaturedTextVariant,
} from "./FeaturedText.interface";

export const FeaturedText: React.FC<FeaturedTextProps> = ({
  title,
  content,
  icon,
  variant,
  size,
  align,
  linkedText,
}) => {
  const featuredTextVariants = {
    iconTop: "flex-col gap-y-4",
    iconLeft: "flex-row gap-x-6",
    text: "",
  };

  const featuredTextAlign = {
    left: "",
    center: "items-center",
  };

  const featuredTextTitleSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const featuredTextContentSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const learnMoreSizeVariants = {
    sm: "gap-x-3 text-sm",
    md: "gap-x-3 text-base",
    lg: "gap-x-5 text-lg",
  };

  const learnMoreIconSizes = {
    sm: "text-base",
    md: "text-base",
    lg: "text-2xl",
  };

  const isTextVariant = variant === "text";
  const textAlignment = featuredTextAlign[align || "left"];

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
      case "md":
        return "text-base pb-4";
      case "lg":
        return variant === "text" ? "text-lg pb-4" : "text-base pb-6";
      default:
        throw new Error("Please provide proper featured text size variant");
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
      {!isTextVariant && <div className="">{icon}</div>}
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
          <a href="#">{linkedText}</a>
          <span className={classNames("font-icons", learnMoreIconSizes[size])}>
            &#xeb12;
          </span>
        </div>
      </div>
    </div>
  );
};

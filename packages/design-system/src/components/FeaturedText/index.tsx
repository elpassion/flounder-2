import classNames from "classnames";
import {
  FeaturedTextIconProps,
  FeaturedTextProps,
  TFeaturedTextSize,
  TFeaturedTextVariant,
} from "./Featuredtext.interface";

export const FeaturedText: React.FC<FeaturedTextProps> = ({
  title,
  content,
  variant,
  size,
  align,
  linkedText,
  linkedUrl,
  ...props
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
    sm: "text-base",
    md: "text-base",
    lg: "text-2xl",
  };

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
      <FeaturedTextIcon size={size} variant={variant} {...props} />
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
          <span className={classNames("font-icons", learnMoreIconSizes[size])}>
            &#xeb12;
          </span>
        </div>
      </div>
    </div>
  );
};

export const FeaturedTextIcon: React.FC<FeaturedTextIconProps> = ({
  imageSrc,
  size,
  icon,
  variant,
  imageAlt,
}) => {
  const isTextVariant = variant === "text";
  const isIconVariant = !isTextVariant && icon && !imageSrc;
  const isImageVariant = !isTextVariant && imageSrc;

  const iconSizes = {
    sm: "text-xs",
    md: "text-lg",
    lg: "text-2xl",
  };

  const iconWrapperSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <>
      {isIconVariant && (
        <div
          className={classNames(
            "flex flex-shrink-0 items-center justify-center rounded-md bg-neutral-50",
            iconWrapperSizes[size]
          )}
        >
          <span
            className={classNames("font-icons", iconSizes[size])}
            dangerouslySetInnerHTML={{ __html: `${icon};` }}
          />
        </div>
      )}

      {isImageVariant && (
        <img
          src={imageSrc}
          alt={imageAlt || ""}
          className={classNames(
            "flex items-center rounded-md bg-center object-cover",
            iconWrapperSizes[size]
          )}
        />
      )}
    </>
  );
};

import classNames from "classnames";
import { FeaturedTextProps } from "./Featuredtext.interface";

export const FeaturedText: React.FC<FeaturedTextProps> = ({
  title,
  content,
  icon,
  variant,
  size,
  align,
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

  const learnMoreGapSize = {
    sm: "gap-x-3",
    md: "gap-x-3",
    lg: "gap-x-5",
  };

  return (
    <div
      className={classNames(
        "flex font-normal text-neutral-600",
        featuredTextVariants[variant],
        featuredTextAlign[align || "left"]
      )}
    >
      {variant !== "text" && <div className="">{icon}</div>}
      <div
        className={classNames(
          "flex flex-col",
          featuredTextAlign[align || "left"]
        )}
      >
        <h6
          className={classNames(
            "pb-2 font-medium",
            featuredTextTitleSizes[size]
          )}
        >
          {title}
        </h6>
        <p className={classNames(featuredTextContentSizes[size])}>{content}</p>
        <div
          className={classNames(
            "flex items-center text-primary-500",
            learnMoreGapSize[size]
          )}
        >
          <a href="#">Learn more</a>
          <span className={classNames("font-icons")}>&#xeb12;</span>
        </div>
      </div>
    </div>
  );
};

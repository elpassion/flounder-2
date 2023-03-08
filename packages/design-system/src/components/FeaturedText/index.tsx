import classNames from "classnames";
import { FeaturedTextProps } from "./Featuredtext.interface";

export const FeaturedText: React.FC<FeaturedTextProps> = ({
  title,
  content,
  icon,
  iconPosition,
  size,
}) => {
  const featuredTextVariants = {
    iconTop: "flex-col",
    iconLeft: "flex-row",
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

  return (
    <div
      className={classNames(
        "flex font-normal text-neutral-600",
        featuredTextVariants[iconPosition]
      )}
    >
      <div className="">{icon}</div>
      <div>
        <h6 className={classNames("pb-2", featuredTextTitleSizes[size])}>
          {title}
        </h6>
        <p className={classNames(featuredTextContentSizes[size])}>{content}</p>
        <div>
          <span>Learn more</span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

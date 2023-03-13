import classNames from "classnames";
import { Icons } from "../../helpers/getIcons";
import { IconProps } from "./Icon.interface";

// @TODO: Refactor not using dangerously inner html
// @TODO: Replace passing entities in favor of icon names
export const Icon: React.FC<IconProps> = ({
  size = "none",
  icon,
  className,
  customIcon,
  iconName,
  ...rest
}) => {
  const iconEntity = iconName && Icons?.[iconName]?.entity;
  const iconSizeVariants = {
    none: "",
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  if (customIcon) {
    return <>{customIcon}</>;
  }

  //@TODO: Add possibility ot resolve by iconName

  return (
    <span
      className={classNames(
        iconSizeVariants[size],
        "font-icons leading-tight",
        className
      )}
      dangerouslySetInnerHTML={{ __html: `${iconEntity};` }}
      {...rest}
    />
  );
};

export default Icon;

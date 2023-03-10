import classNames from "classnames";
import { Icons } from "../../helpers/getIcons";
import { IconProps } from "./Icon.interface";

const Icon: React.FC<IconProps> = ({
  size = "none",
  icon,
  className,
  ...rest
}) => {
  const iconEntity = Icons?.[icon]?.entity;
  const iconSizeVariants = {
    none: "",
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

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

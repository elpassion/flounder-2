import classNames from "classnames";
import { IconProps } from "./Icon.interface";

const Icon: React.FC<IconProps> = ({
  size = 'none',
  icon,
  className,
  ...rest
}) => {
  const iconSizeVariants = {
    none: "",
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <span
      className={classNames(iconSizeVariants[size], "font-icons leading-tight", className)}
      dangerouslySetInnerHTML={{ __html: `${icon};` }}
      {...rest}
    />
  );
};

export default Icon;

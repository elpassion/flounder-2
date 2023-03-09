import classNames from "classnames";
import { IconProps } from "./Icon.interface";

const Icon: React.FC<IconProps> = ({
  size = 'sm',
  icon,
  ...rest
}) => {
  const iconSizeVariants = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
      <span
        className={classNames("font-icons", iconSizeVariants[size])}
        dangerouslySetInnerHTML={{ __html: `${icon};` }}
        {...rest}
      />
  );
};

export default Icon;

import classNames from "classnames";
import { IconButton } from "../../components/IconButton";
import {
  buttonBorderVariants,
  buttonRadiusVariants,
} from "../ButtonGroup/helpers";
import type { IconButtonGroupProps } from "./IconButtonGroup.interface";

export const IconButtonGroup: React.FC<IconButtonGroupProps> = ({
  buttons,
  size,
  variant,
}) => {
  return (
    <div className="inline-flex">
      {buttons.map((button, index) => (
        <IconButton
          variant={variant}
          key={index}
          size={size}
          className={classNames(
            "hover:z-10",
            buttonRadiusVariants(buttons)[index] || "-ml-px rounded-none",
            buttonBorderVariants[variant]
          )}
          {...button}
        />
      ))}
    </div>
  );
};

export default IconButtonGroup;

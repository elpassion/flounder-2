import { IconButton, IconButtonProps } from "components/IconButton";
import classNames from "classnames";
import {
  buttonBorderVariants,
  buttonRadiusVariants,
} from "../ButtonGroup/ButtonGroup.styles";

export interface IconButtonGroupProps
  extends Pick<IconButtonProps, "size" | "variant"> {
  buttons: Omit<IconButtonProps, "size" | "variant">[];
}

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

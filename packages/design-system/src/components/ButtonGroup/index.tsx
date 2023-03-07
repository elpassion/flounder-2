import classNames from "classnames";
import { Button } from "components/Button";
import {
  buttonBorderVariants,
  buttonRadiusVariants,
} from "./helpers";
import type { ButtonGroupProps } from "./ButtonGroup.interface";

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  size,
  variant,
}) => {
  return (
    <div className="inline-flex">
      {buttons.map((button, index) => (
        <Button
          key={index}
          size={size}
          variant={variant}
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

export default ButtonGroup;

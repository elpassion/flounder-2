import { Button } from "components/Button";
import classNames from "classnames";
import { ButtonGroupProps } from "./ButtonGroup.interface";
import {
  buttonBorderVariants,
  buttonRadiusVariants,
} from "./ButtonGroup.styles";

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

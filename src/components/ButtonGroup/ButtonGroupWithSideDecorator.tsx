import { ButtonGroupProps } from "./ButtonGroup.interface";
import { Button } from "components/Button";
import classNames from "classnames";
import { IconButton } from "components/IconButton";
import { buttonBorderVariants } from "./ButtonGroup.styles";

export const ButtonGroupWithSideDecorator: React.FC<ButtonGroupProps> = ({
  buttons,
  size,
  variant,
  style,
}) => {
  return (
    <div className="inline-flex gap-x-4">
      {buttons.map((button, index) => (
        <div className="flex">
          <Button
            key={index}
            size={size}
            variant={variant}
            className={classNames(
              "rounded-r-none hover:z-10",
              buttonBorderVariants[variant]
            )}
            {...button}
          />
          {style === "withIcon" ? (
            <IconButton
              size={size}
              variant={variant}
              icon="&#xea8a"
              className={classNames(
                "-ml-px rounded-l-none hover:z-10",
                buttonBorderVariants[variant]
              )}
            />
          ) : (
            <Button
              size={size}
              variant={variant}
              text="Text"
              className={classNames(
                "-ml-px rounded-l-none hover:z-10",
                buttonBorderVariants[variant]
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ButtonGroupWithSideDecorator;

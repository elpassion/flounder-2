import classNames from "classnames";
import { Button } from "../Button";
import UserSvg from "../../svgs/UserSvg";
import { buttonBorderVariants } from "./helpers";
import type { ButtonGroupProps } from "./ButtonGroup.interface";

export const ButtonGroupWithSideDecorator: React.FC<ButtonGroupProps> = ({
  buttons,
  size,
  variant,
  style,
  icon = <UserSvg className="block" />,
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

          {style === "withIcon" || icon ? ( // @TODO: Fix
            icon || (
              <div className="-ml-px aspect-square h-5/6 rounded-l-none hover:z-10">
                <UserSvg className="aspect-square h-full stroke-current" />
                .....
              </div>
            )
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

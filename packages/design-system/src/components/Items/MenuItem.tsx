import classNames from "classnames";
import Icon from "../Icon";
import * as Items from "./";
import type { MenuItemProps } from "./Items.interface";

export const MenuItem: React.FC<MenuItemProps> = ({
  text,
  variant = "fullWidth",
  leftIcon,
  middleIcon,
  rightIcon,
}) => {
  const isLeftIconVisible = variant === "fullWidth" && leftIcon;
  const isRightIconVisible =
    (variant === "fullWidth" || variant === "fitWidth") && rightIcon;

  const styleVariants = {
    onlyIcon: "w-9",
    fullWidth: "w-full gap-x-2",
    fitWidth: "min-w-fit",
  };

  return (
    <Items.Container
      className={classNames(
        // @TODO: Add special sizes to config and ditch JIT to keep design system consistent embeded into config
        "grid h-9 grid-cols-[auto_1fr_auto] grid-rows-1 border",
        styleVariants[variant]
      )}
    >
      {isLeftIconVisible && (
        <div className="aspect-square w-4">
          <Icon customIcon={leftIcon} />
        </div>
      )}
      <div className="col-start-2 flex items-center gap-2">
        {middleIcon && (
          <div className="aspect-square w-5">
            <Icon customIcon={middleIcon} />
          </div>
        )}
        {(variant === "fullWidth" || variant === "fitWidth") && (
          <p className="text-sm">{text}</p>
        )}
      </div>
      {isRightIconVisible && (
        <div className="ml-4 aspect-square w-4">
          <Icon customIcon={rightIcon} />
        </div>
      )}
    </Items.Container>
  );
};

export default MenuItem;

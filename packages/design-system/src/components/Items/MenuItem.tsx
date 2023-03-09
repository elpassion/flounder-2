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
  const isLeftIconVisible = variant === "fullWidth" && !!leftIcon;
  const isRightIconVisible = variant === "fullWidth" && !!rightIcon;
  const isMiddleIconVisible = !!middleIcon;

  const styleVariants = {
    onlyIcon: "w-9",
    fullWidth: "w-56 gap-x-2",
  };

  return (
    <Items.Container
      className={classNames(
        // @TODO: Add special sizes to config and ditch JIT to keep design system consistent embeded into config
        "grid h-9 grid-cols-[auto_1fr_auto] grid-rows-1 border",
        styleVariants[variant]
      )}
    >
      {isLeftIconVisible && <Icon icon={leftIcon} />}
      <div className="col-start-2 flex items-center gap-2">
        {isMiddleIconVisible && (
          <Icon icon={middleIcon} className="text-xl" />
        )}
        {variant === "fullWidth" && <p className="text-sm">{text}</p>}
      </div>
      {isRightIconVisible && <Icon icon={rightIcon} />}
    </Items.Container>
  );
};

export default MenuItem;

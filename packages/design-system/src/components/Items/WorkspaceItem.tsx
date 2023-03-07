import classNames from "classnames";
import { Avatar } from "components/Avatar";
import * as Items from "components/Items";
import type { WorkspaceItemProps } from "./Items.interface";

export const WorkspaceItem: React.FC<WorkspaceItemProps> = ({
  size = "md",
  variant = "fullWidth",
  shape = "square",
  contentType = "text",
  src,
  alt,
}) => {
  const sizeTextVariants = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  };

  const styleVariants = {
    onlyIcon: "w-fit border-2",
    fullWidth: "w-56 border",
  };

  return (
    <Items.Container
      className={classNames("flex gap-3", styleVariants[variant])}
    >
      <Avatar
        name="Anna Kapusta"
        shape={shape}
        contentType={contentType}
        src={src}
        size={size}
        alt={alt}
        className="!bg-neutral-300 !text-neutral-700"
      />
      {variant === "fullWidth" && (
        <>
          <p className={classNames("font-medium", sizeTextVariants[size])}>
            Flounder
          </p>
          <Items.Icon icon="&#xeacb" />
        </>
      )}
    </Items.Container>
  );
};

export default WorkspaceItem;

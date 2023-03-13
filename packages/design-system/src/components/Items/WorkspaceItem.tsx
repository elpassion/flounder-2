import classNames from "classnames";
import CameraSvg from "../../svgs/CameraSvg";
import { Avatar } from "../Avatar";
import * as Items from "./";
import type { WorkspaceItemProps } from "./Items.interface";

export const WorkspaceItem: React.FC<WorkspaceItemProps> = ({
  size = "md",
  variant = "fitWidth",
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
    fullWidth: "w-full border",
    fitWidth: "min-w-fit",
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
      {(variant === "fullWidth" || variant === "fitWidth") && (
        <>
          <p className={classNames("font-medium", sizeTextVariants[size])}>
            Flounder
          </p>
          <CameraSvg className="ml-2 h-4 w-4" />
        </>
      )}
    </Items.Container>
  );
};

export default WorkspaceItem;

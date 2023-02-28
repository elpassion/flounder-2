import classNames from "classnames";
import { Avatar } from "components/Avatar";
import { AvatarProps } from "components/Avatar/Avatar.interface";

export interface WorkspaceItemProps
  extends Pick<AvatarProps, "shape" | "src" | "contentType" | "alt"> {
  size?: "sm" | "md" | "lg";
  variant?: "onlyAvatar" | "fullWidth";
}

export const WorkspaceItem: React.FC<WorkspaceItemProps> = ({
  size = "md",
  variant = "fullWidth",
  shape = "square",
  contentType = "text",
  src,
  alt,
}) => {
  //TIP:classes to use for active state
  const activeStyle = "bg-neutral-200 border-neutral-200";

  const sizeTextVariants = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  };

  const styleVariants = {
    onlyAvatar: "w-fit border-2",
    fullWidth: "w-56 border",
  };

  return (
    <button
      className={classNames(
        "flex cursor-pointer items-center gap-3 rounded-lg border-transparent p-2 text-neutral-500",
        "hover:border-neutral-100 hover:bg-neutral-100",
        "active:border-neutral-200 active:bg-neutral-50",
        styleVariants[variant]
      )}
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
          <span className="font-icons">&#xeacb;</span>
        </>
      )}
    </button>
  );
};

export default WorkspaceItem;

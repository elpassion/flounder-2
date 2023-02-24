import classNames from "classnames";
import { Avatar } from "components/Avatar";

export interface WorkspaceItemProps {
  size?: "sm" | "md" | "lg";
  variant?: "onlyAvatar" | "fullWidth";
}

export const WorkspaceItem: React.FC<WorkspaceItemProps> = ({
  size = "md",
  variant = "fullWidth",
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
        "focus:border-neutral-200 focus:bg-neutral-50",
        styleVariants[variant]
      )}
    >
      <Avatar
        shape="square"
        name="Anna Kapusta"
        contentType="text"
        size={size}
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

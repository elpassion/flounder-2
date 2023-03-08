import classNames from "classnames";
import Avatar from "../../components/Avatar";
import type { AvatarGroupProps } from "./AvatarGroup.interface";

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  visibleAvatars = 3,
  size,
  shape,
  contentType,
  className,
}) => {
  const visibleAvatarsArray = avatars.slice(0, visibleAvatars);

  return (
    <div className={classNames("flex -space-x-3", className)}>
      {visibleAvatarsArray.map((avatar) => (
        <Avatar
          {...avatar}
          size={size}
          shape={shape}
          contentType={contentType}
        />
      ))}

      {avatars.length > visibleAvatars && (
        <Avatar
          name={`+${avatars.length - visibleAvatars}`}
          shape={shape}
          size={size}
          contentType={"text"}
        />
      )}
    </div>
  );
};

export default AvatarGroup;

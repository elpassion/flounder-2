import classNames from "classnames";

import Avatar from "components/Avatar";
import { AvatarProps } from "components/Avatar/Avatar.interface";

interface UserInterface {
  name: string;
  src: string;
  alt?: string;
}

interface AvatarGroupProps
  extends Pick<AvatarProps, "size" | "shape" | "contentType"> {
  avatars: UserInterface[];
  visibleAvatars?: number;
  className?: string;
}

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
          text={`+${avatars.length - visibleAvatars}`}
          shape={shape}
          size={size}
          contentType={"text"}
          src={""}
        />
      )}
    </div>
  );
};

export default AvatarGroup;

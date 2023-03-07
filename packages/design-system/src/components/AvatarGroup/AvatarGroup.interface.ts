import { AvatarProps } from "components/Avatar/Avatar.interface";

interface UserInterface {
  name: string;
  src: string;
  alt?: string;
}

export interface AvatarGroupProps
  extends Pick<AvatarProps, "size" | "shape" | "contentType"> {
  avatars: UserInterface[];
  visibleAvatars?: number;
  className?: string;
}
type sizes = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface BaseAvatarProps extends React.PropsWithChildren {
  shape: "circle" | "square";
  size?: sizes;
  src?: string;
}

export interface AvatarChildrenProps extends React.PropsWithChildren {
  contentType: "icon" | "text";
}

export interface ImageProps extends AvatarChildrenProps {
  src: string;
  alt?: string;
}

export interface IconProps extends AvatarChildrenProps {
  size: sizes;
}

export interface AvatarProps
  extends BaseAvatarProps,
    AvatarChildrenProps,
    Pick<ImageProps, "alt"> {
  text?: string;
}

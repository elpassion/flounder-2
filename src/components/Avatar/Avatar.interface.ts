type sizes = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface ContainerProps extends React.PropsWithChildren {
  shape: "circle" | "square";
  size?: sizes;
  src?: string;
  className?: string;
}

export interface AvatarChildrenProps extends React.PropsWithChildren {
  className?: string;
}

export interface ImageProps extends AvatarChildrenProps {
  src: string;
  alt?: string;
}

export interface IconProps extends AvatarChildrenProps {
  size?: sizes;
}

export interface AvatarProps
  extends Pick<ContainerProps, "size" | "src" | "shape">,
    Pick<ImageProps, "alt"> {
  contentType: "icon" | "text";
  text?: string;
}

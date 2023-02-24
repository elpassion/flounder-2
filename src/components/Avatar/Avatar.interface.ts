type sizes = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface ContainerProps extends React.PropsWithChildren {
  shape: "circle" | "square";
  size?: sizes;
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
  extends Pick<ContainerProps, "size" | "shape">,
    Pick<ImageProps, "alt" | "src"> {
  name?: string;
  label?: string;
  capition?: string;
  contentType: "icon" | "text";
}

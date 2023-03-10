import classNames from "classnames";
import * as AvatarComponents from "./";
import UserSvg from "../../svgs/UserSvg";
import { ImageTag } from "../../utils/ImageTag";
import type {
  AvatarChildrenProps,
  AvatarProps,
  ContainerProps,
  ImageProps,
} from "./Avatar.interface";

export const Container: React.FC<ContainerProps> = ({
  children,
  shape = "circle",
  size = "md",
  className,
}) => {
  const sizesVariants = {
    xxs: "h-5 w-5 text-xxs",
    xs: "h-6 w-6 text-xxs",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-14 w-14 text-lg",
    xxl: "h-16 w-16 text-lg",
  };

  return (
    <div
      className={classNames(
        "flex items-center justify-center overflow-hidden bg-neutral-100 text-neutral-500",
        sizesVariants[size],
        {
          "rounded-full": shape === "circle",
          "rounded-lg": shape === "square",
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export const Text: React.FC<AvatarChildrenProps> = ({
  children,
  className,
}) => <span className={className}>{children}</span>;

export const Image: React.FC<ImageProps> = ({ src, alt = "User Avatar" }) => (
  <ImageTag src={src} alt={alt} className="w-full" objectFitCover />
);

export const Avatar: React.FC<AvatarProps> = ({
  name,
  label,
  capition,
  size = "md",
  src,
  contentType = "icon",
  ...props
}) => {
  const initials = name?.slice(0, 2).toUpperCase();
  const withTextLabels = label || capition;

  const labelSizeVariants = {
    xxs: "text-xxs",
    xs: "text-xs",
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-base",
    xxl: "text-lg",
  };

  const capitionSizeVariants = {
    xxs: "hidden",
    xs: "hidden",
    sm: "text-xs",
    md: "text-xs",
    lg: "text-xs",
    xl: "text-sm",
    xxl: "text-sm",
  };

  return (
    <div className="flex items-center">
      <AvatarComponents.Container size={size} {...props}>
        {src ? (
          <AvatarComponents.Image src={src} />
        ) : (
          <>
            {contentType === "text" && (
              <AvatarComponents.Text>{initials}</AvatarComponents.Text>
            )}
            {contentType === "icon" && (
              <UserSvg className="block aspect-square w-3/5" />
            )}
          </>
        )}
      </AvatarComponents.Container>
      {withTextLabels && (
        <div className="ml-2 flex flex-col gap-1 text-neutral-500">
          <AvatarComponents.Text
            className={classNames("font-medium", labelSizeVariants[size])}
          >
            {label}
          </AvatarComponents.Text>
          <AvatarComponents.Text className={capitionSizeVariants[size]}>
            {capition}
          </AvatarComponents.Text>
        </div>
      )}
    </div>
  );
};

export default Avatar;

import classNames from "classnames";
import type { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  objectFitCover?: boolean;
}
export const EasyImage: React.FC<ImageProps> = ({
  src,
  alt = "User avatar",
  className,
  objectFitCover,
  ...rest
}) => (
  <img
    src={src}
    alt={alt}
    aria-label={alt}
    className={classNames({ "object-cover": objectFitCover }, className)}
    {...rest}
  />
);

import classNames from "classnames";
import type { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  objectFitCover?: boolean;
}
export const ImageTag: React.FC<ImageProps> = ({
  src,
  alt,
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

import { ImgHTMLAttributes } from "react";
import { ImageTag } from "./ImageTag";

interface FeaturedTextImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const FeaturedTextImage: React.FC<FeaturedTextImageProps> = ({
  src,
  alt,
  ...rest
}) => (
  <ImageTag
    src={src}
    alt={alt}
    className="flex aspect-square w-full items-center rounded-md bg-center"
    objectFitCover
    {...rest}
  />
);

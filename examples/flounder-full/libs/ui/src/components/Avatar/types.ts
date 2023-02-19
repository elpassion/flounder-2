export type AvatarSize = 'big' | 'medium' | 'small';

export interface AvatarProps {
  src: string;
  size?: AvatarSize;
}

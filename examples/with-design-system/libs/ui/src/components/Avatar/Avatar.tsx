import classNames from 'classnames';
import { AvatarProps } from './types';

export const Avatar = ({ src, size = 'small' }: AvatarProps) => {
  return (
    <div
      className={classNames(
        'rounded-full bg-white border overflow-hidden flex justify-center items-center relative shrink-0',
        {
          'h-40 w-40': size === 'big',
          'h-20 w-20 ': size === 'medium',
          'h-10 w-10 ': size === 'small',
        }
      )}
    >
      <img
        src={src}
        alt=""
        role="presentation"
        className="object-contain w-full h-full"
      />
    </div>
  );
};

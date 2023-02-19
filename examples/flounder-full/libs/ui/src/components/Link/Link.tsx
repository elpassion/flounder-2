import { AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export const Link = ({
  children,
  href,
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      className={classNames(
        'cursor-pointer text-indigo-600 hover:text-indigo-500',
        className
      )}
      href={href}
      {...rest}
    >
      {children}
    </a>
  );
};

import classNames from 'classnames';
import { ButtonProps } from './types';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(
        'border py-2 px-3 rounded-md text-sm leading-0 shadow-sm font-medium whitespace-nowrap',
        {
          'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300 focus:border-gray-300 focus:outline focus:outline-1 focus:outline-gray-300':
            variant === 'primary',
          'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500':
            variant === 'secondary',
          'w-full': fullWidth,
          'w-fit': !fullWidth,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

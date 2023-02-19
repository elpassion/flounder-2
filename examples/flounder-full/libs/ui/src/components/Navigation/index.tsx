import { ReactNode } from 'react';
import classNames from 'classnames';

export function Navigation({ children }: { children: ReactNode }) {
  return <nav className="flex-1 px-2 py-4 space-y-1">{children}</nav>;
}

export function NavigationItem({
  isActive,
  children,
  icon,
}: {
  isActive: boolean;
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <div
      className={classNames(
        {
          'bg-gray-900 text-white': isActive,
          'text-gray-300 hover:bg-gray-700 hover:text-white': !isActive,
        },
        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
      )}
    >
      <div
        className={classNames(
          {
            'text-gray-300': isActive,
            'text-gray-400 group-hover:text-gray-300': !isActive,
          },
          'mr-3 flex-shrink-0 h-6 w-6'
        )}
        aria-hidden="true"
      >
        {icon}
      </div>
      {children}
    </div>
  );
}

import { SVGProps } from 'react';
import classNames from 'classnames';
import toast from 'react-hot-toast';
import { XIcon } from '@heroicons/react/solid';
import { CustomToastColorsClasses } from './Toast.interface';

interface ToastWrapperProps {
  id: string;
  customToastColorsClasses: CustomToastColorsClasses;
  CustomIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  className?: string;
  title?: string;
  description?: string;
}

export const ToastWrapper = ({
  id,
  className,
  customToastColorsClasses,
  CustomIcon,
  title,
  description,
}: ToastWrapperProps) => {
  const {
    toastBackground,
    accentColor,
    accentStrokeColor,
    accentBeforeBackground,
  } = customToastColorsClasses;
  const onCloseClick = () => toast.dismiss(id);

  return (
    <div
      className={classNames(
        'rounded-md flex flex-row flex-nowrap items-stretch before:w-[6px] before:rounded-l-md before:flex-none',
        accentBeforeBackground,
        toastBackground,
        className
      )}
    >
      {CustomIcon && (
        <div className={`flex-none py-3 pl-4 ${accentColor}`}>
          <CustomIcon className="w-7 h-7" />
        </div>
      )}

      <div className="pl-4 pt-3 pb-4 flex flex-col justify-center">
        {title && (
          <p className="text-black text-base font-normal mb-2">{title}</p>
        )}
        {description && (
          <p className="text-black text-sm font-light">{description}</p>
        )}
      </div>

      <div className="ml-auto p-4">
        <button
          type="button"
          className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={onCloseClick}
        >
          <XIcon className={`w-4 h-4 ${accentStrokeColor} stroke-2`} />
        </button>
      </div>
    </div>
  );
};

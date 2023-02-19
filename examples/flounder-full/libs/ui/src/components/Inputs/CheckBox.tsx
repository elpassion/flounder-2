import { forwardRef, InputHTMLAttributes } from 'react';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  description?: string;
}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ text, description, ...rest }: CheckBoxProps, ref) => {
    return (
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            defaultChecked
            {...rest}
            type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={rest.name} className="font-medium text-gray-700">
            {text}
          </label>
          {description ? <p className="text-gray-500">{description}</p> : null}
        </div>
      </div>
    );
  }
);

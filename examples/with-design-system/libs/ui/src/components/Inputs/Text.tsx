import { forwardRef, InputHTMLAttributes } from 'react';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;
export const Text = forwardRef<HTMLInputElement, TextInputProps>(
  ({ placeholder, ...rest }: TextInputProps, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        {...rest}
        placeholder={placeholder}
        className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-fit"
      />
    );
  }
);

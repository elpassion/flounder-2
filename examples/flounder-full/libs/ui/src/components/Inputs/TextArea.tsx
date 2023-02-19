import { forwardRef, TextareaHTMLAttributes } from 'react';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ...rest }: TextAreaProps, ref) => {
    return (
      <textarea
        ref={ref}
        {...rest}
        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm border-gray-300 rounded-md"
      />
    );
  }
);

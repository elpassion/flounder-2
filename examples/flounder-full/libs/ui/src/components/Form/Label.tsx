import { LabelHTMLAttributes } from 'react';

export function Label({
  htmlFor,
  children,
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      {children}
    </label>
  );
}

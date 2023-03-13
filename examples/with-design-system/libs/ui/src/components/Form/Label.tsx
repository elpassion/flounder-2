import { LabelHTMLAttributes } from 'react';

// @todo: Check, but seems okay
export function Label({
  htmlFor,
  children,
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
}

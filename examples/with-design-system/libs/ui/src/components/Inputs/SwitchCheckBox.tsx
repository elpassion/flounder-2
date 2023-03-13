import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export interface SwitchCheckBoxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  text?: string | ReactNode;
  checked: boolean;
  onSwitchChange(checked: boolean): void;
}

export const SwitchCheckBox = forwardRef<HTMLInputElement, SwitchCheckBoxProps>(
  ({ text, checked, onSwitchChange, ...rest }: SwitchCheckBoxProps, ref) => {
    return (
      <label className="inline-flex relative items-center mr-5 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          readOnly
          ref={ref}
          {...rest}
        />
        <div
          onClick={() => {
            onSwitchChange(!checked);
          }}
          className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"
        ></div>
        <span className="ml-2 text-sm font-medium text-gray-900">{text}</span>
      </label>
    );
  }
);

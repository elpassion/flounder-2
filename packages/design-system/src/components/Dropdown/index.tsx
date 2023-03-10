import { DropdownProps, IDropdownOption } from "./Dropdown.interface";
import ReactSelect, { components, OptionProps } from "react-select";
import { forwardRef } from "react";

const { Option } = components;

export const Dropdown = forwardRef((props: DropdownProps, ref) => {
  return <DropdownComponents.BaseDropdown {...props} {...ref} />;
});

const DropdownComponents = {
  BaseDropdown: ({ isMulti, variant, caption, options }: DropdownProps) => {
    return (
      <ReactSelect
        options={options}
        isMulti={isMulti}
        components={{ Option: DropdownComponents.DropdownOption }}
      />
    );
  },
  DropdownOption: (props: OptionProps<IDropdownOption>) => {
    const { label, leftIcon, rightIcon } = props.data;
    return (
      <Option {...props}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3 ">
            {leftIcon}
            <div>{label}</div>
          </div>
          {rightIcon}
        </div>
      </Option>
    );
  },
};

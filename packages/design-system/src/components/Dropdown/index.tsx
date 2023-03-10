import { DropdownProps, IDropdownOption } from "./Dropdown.interface";
import ReactSelect, { components, MenuProps, OptionProps } from "react-select";
import { forwardRef } from "react";

const { Option, Menu } = components;

export const Dropdown = forwardRef((props: DropdownProps, ref) => {
  return <DropdownComponents.BaseDropdown {...props} {...ref} />;
});

const DropdownComponents = {
  BaseDropdown: ({
    isMulti,
    variant,
    caption,
    options,
    skipMenuGap,
  }: DropdownProps) => {
    const MENU_WIDTH = `calc(100% - 2px)` as const;

    const customDropdownStyles = {
      menu: (base: any) => ({
        ...base,
        marginTop: skipMenuGap ? 0 : 8,
        marginLeft: 1,
        borderRadius: skipMenuGap ? "0 0 8px 8px" : "8px",
        width: MENU_WIDTH,
      }),
      control: (base: any) => ({
        ...base,
        borderRadius: skipMenuGap ? "8px 8px 0 0" : "8px",
      }),
    };

    return (
      <ReactSelect
        menuIsOpen={true}
        options={options}
        isMulti={isMulti}
        components={{
          Option: DropdownComponents.DropdownOption,
          Menu: DropdownComponents.DropdownMenu,
        }}
        styles={customDropdownStyles}
      />
    );
  },
  DropdownOption: (props: OptionProps<IDropdownOption>) => {
    const { data } = props;
    const { label, leftIcon, rightIcon } = data;
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
  DropdownMenu: (props: MenuProps<IDropdownOption>) => {
    return <Menu {...props} />;
  },
};

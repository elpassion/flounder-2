import {
  DropdownProps,
  IDropdownOption,
  TDropdownVariant,
} from "./Dropdown.interface";
import ReactSelect, { components, MenuProps, OptionProps } from "react-select";
import { forwardRef } from "react";
import Toggle from "../Toggle";
import Checkbox from "../Checkbox";

const { Option, Menu } = components;

export const Dropdown = forwardRef((props: DropdownProps, ref) => {
  return <DropdownComponents.BaseDropdown {...props} {...ref} />;
});

const DropdownComponents = {
  BaseDropdown: ({
    isMulti,
    variant = "default",
    supportingText,
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
          Option: (props) => (
            <DropdownComponents.DropdownOption
              option={props}
              variant={variant}
            />
          ),
          Menu: DropdownComponents.DropdownMenu,
        }}
        styles={customDropdownStyles}
      />
    );
  },
  DropdownOption: (props: {
    option: OptionProps<IDropdownOption>;
    variant: TDropdownVariant;
  }) => {
    const { data } = props.option;
    const { label, leftIcon, rightIcon } = data;
    const isDefaultVariant = props.variant === "default";
    const isToggleVariant = props.variant === "toggle";
    const isCheckboxLeftVariant = props.variant === "checkbox-left";
    const isCheckboxRightVariant = props.variant === "checkbox-right";

    return (
      <Option {...props.option}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-x-3">
            {isCheckboxLeftVariant && (
              <Checkbox name={label} labelText={label} size="sm" />
            )}
            {isDefaultVariant && (
              <>
                {leftIcon}
                <div>{label}</div>
              </>
            )}
          </div>
          <div>
            {isDefaultVariant && rightIcon}
            {isToggleVariant && <Toggle size="sm" />}
            {isCheckboxRightVariant && <Checkbox name="" />}
          </div>
        </div>
      </Option>
    );
  },
  DropdownMenu: (props: MenuProps<IDropdownOption>) => {
    return <Menu {...props} />;
  },
};

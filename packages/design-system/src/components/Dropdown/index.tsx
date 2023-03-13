import {
  DropdownProps,
  IDropdownOption,
  TDropdownVariant,
} from "./Dropdown.interface";
import ReactSelect, { components, MenuProps, OptionProps } from "react-select";
import { forwardRef } from "react";
import Toggle from "../Toggle";
import Checkbox from "../Checkbox";
import classNames from "classnames";

const { Option, Menu } = components;

export const Dropdown = forwardRef((props: DropdownProps, ref) => {
  return <DropdownComponents.BaseDropdown {...props} {...ref} />;
});

const DropdownComponents = {
  BaseDropdown: ({
    isMulti,
    variant = "default",
    options,
    skipMenuGap,
  }: DropdownProps) => {
    const MENU_WIDTH = `calc(100% - 2px)` as const;

    const customDropdownStyles = {
      menu: (base: any) => ({
        ...base,
        marginTop: skipMenuGap ? 0 : 8,
        marginLeft: 1,
        border: "1px solid #DAE2EB",
        boxShadow: "0px 8px 16px rgba(27, 36, 44, 0.12)",
        borderRadius: skipMenuGap ? "0 0 8px 8px" : "8px",
        width: MENU_WIDTH,
      }),
      control: (base: any) => ({
        ...base,
        borderRadius: skipMenuGap ? "8px 8px 0 0" : "8px",
      }),
      option: (base: any, state: any) => ({
        ...base,
        padding: 0,
        backgroundColor: state.isSelected ? "#F4F6F8" : "transparent",
      }),
      menuList: (base: any) => ({
        ...base,
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
    const { data, isSelected, isFocused } = props.option;
    const { label, leftIcon, rightIcon, supportingText } = data;
    const isDefaultVariant = props.variant === "default";
    const isToggleVariant = props.variant === "toggle";
    const isCheckboxLeftVariant = props.variant === "checkbox-left";
    const isCheckboxRightVariant = props.variant === "checkbox-right";

    return (
      <Option
        {...props.option}
        className="hover:bg-neutral-100 active:bg-neutral-50"
      >
        <div className="py-3.5 px-4 hover:bg-neutral-100 active:bg-neutral-50">
          <div className="flex items-center justify-between text-sm text-neutral-900">
            <div className="flex items-center gap-x-3">
              {isCheckboxLeftVariant && (
                <Checkbox name={label} labelText={label} size="sm" />
              )}
              {isDefaultVariant && (
                <div className="flex items-center text-neutral-700">
                  {leftIcon}
                </div>
              )}
              {!isCheckboxLeftVariant && (
                <div className="flex flex-col">
                  {label}
                  <small className="text-xs text-neutral-700">
                    {supportingText}
                  </small>
                </div>
              )}
            </div>
            <div>
              {isDefaultVariant && (
                <div
                  className={classNames(
                    "flex items-center text-neutral-300",
                    isFocused && "text-neutral-500",
                    isSelected && "text-primary-500"
                  )}
                >
                  {rightIcon}
                </div>
              )}
              {isToggleVariant && <Toggle size="sm" />}
              {isCheckboxRightVariant && <Checkbox name={label} size="sm" />}
            </div>
          </div>
        </div>
      </Option>
    );
  },
  DropdownMenu: (props: MenuProps<IDropdownOption>) => {
    return <Menu {...props} />;
  },
};

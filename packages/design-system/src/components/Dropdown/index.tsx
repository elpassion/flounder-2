import {
  DropdownProps,
  IDropdownOption,
  TDropdownVariant,
} from "./Dropdown.interface";
import ReactSelect, {
  components,
  MenuProps,
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
  OptionProps,
} from "react-select";
import { forwardRef } from "react";
import classNames from "classnames";
import Toggle from "../Toggle";
import Checkbox from "../Checkbox";
import CloseSvg from "../../svgs/CloseSvg";

const { Option, Menu, MultiValue, MultiValueLabel, MultiValueRemove } =
  components;

export const Dropdown = forwardRef((props: DropdownProps, ref) => {
  return <DropdownComponents.BaseDropdown {...props} {...ref} />;
});

const DropdownComponents = {
  BaseDropdown: ({
    isMulti,
    variant = "default",
    options,
    skipMenuGap,
    hideSelectedOptions,
  }: DropdownProps) => {
    const MENU_WIDTH = `calc(100% - 2px)` as const;

    const applyNoBorderStyles = (baseStyles: any) => ({
      ...baseStyles,
      border: "none",
    });

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
      multiValueLabel: (base: any) => applyNoBorderStyles(base),
      multiValueRemove: (base: any) => ({
        paddingRight: "8px",
        ...applyNoBorderStyles(base),
      }),
    };

    return (
      <ReactSelect
        menuIsOpen={true}
        unstyled={true}
        options={options}
        isMulti={isMulti}
        hideSelectedOptions={hideSelectedOptions}
        components={{
          Option: (props) => (
            <DropdownComponents.DropdownOption
              option={props}
              variant={variant}
            />
          ),
          Menu: DropdownComponents.DropdownMenu,
          MultiValue: DropdownComponents.MultiValueSelectedItem,
          MultiValueLabel: (props) => (
            <DropdownComponents.MultiValueSelectedItemLabel
              option={props}
              variant={variant}
            />
          ),
          MultiValueRemove: DropdownComponents.MultiValueRemoveButton,
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
          <div className="flex items-center justify-between text-sm font-normal text-neutral-900">
            <div className="flex items-center gap-x-3">
              {isCheckboxLeftVariant && (
                <Checkbox
                  name={label}
                  labelText={label}
                  size="sm"
                  labelClassName="font-normal"
                />
              )}

              {!isCheckboxLeftVariant && (
                <>
                  <div className="flex items-center text-neutral-700">
                    {leftIcon}
                  </div>
                  <div className="flex flex-col">
                    {label}
                    <small className="text-xs text-neutral-700">
                      {supportingText}
                    </small>
                  </div>
                </>
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
  MultiValueSelectedItem: (props: MultiValueProps<IDropdownOption>) => {
    return (
      <MultiValue
        {...props}
        className="mr-2 rounded-md border border-neutral-200 bg-neutral-50"
      ></MultiValue>
    );
  },
  MultiValueSelectedItemLabel: (props: {
    option: MultiValueGenericProps<IDropdownOption>;
    variant: TDropdownVariant;
  }) => {
    const { option, variant } = props;

    const { data } = option;
    const isPersonVariant = variant === "person";
    return (
      <MultiValueLabel {...props.option}>
        <div className="flex items-center p-2 pr-3">
          {isPersonVariant && (
            <div className="mr-2 flex aspect-square w-4 items-center">
              {data.leftIcon}
            </div>
          )}
          <div className="text-sm">{data.label}</div>
        </div>
      </MultiValueLabel>
    );
  },
  MultiValueRemoveButton: (props: MultiValueRemoveProps<IDropdownOption>) => {
    return (
      <MultiValueRemove {...props}>
        <CloseSvg className="aspect-square w-3" />
      </MultiValueRemove>
    );
  },
};

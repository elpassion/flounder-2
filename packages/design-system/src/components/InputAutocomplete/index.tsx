import { useState } from "react";
import classNames from "classnames";
import HelpCircleSvg from "../../svgs/HelpCircleSvg";
import SearchSvg from "../../svgs/SearchSvg";
import PlusSvg from "../../svgs/PlusSvg";
import * as Input from "../Input";
import type {
  DropdownListItemProps,
  DropdownProps,
  InputAutocompleteProps,
} from "./InputAutocomplete.interface";

export const DropdownItem: React.FC<DropdownListItemProps> = ({
  label,
  icon,
  value,
}) => {
  const renderItemLabel = (text: string) => {
    const isInputValueBeginningOfText =
      text.toLowerCase().indexOf(value.toLowerCase()) === 0;
    const inputValueLength = value.length;

    if (isInputValueBeginningOfText) {
      const newColorString = text.slice(0, inputValueLength);
      const restOfString = text.slice(inputValueLength, text.length);
      return (
        <>
          <span className="text-blue-500">{newColorString}</span>
          {restOfString}
        </>
      );
    }
    return text;
  };

  return (
    <li className="flex items-center gap-2">
      {icon}
      <span>{renderItemLabel(label)}</span>
    </li>
  );
};

export const Dropdown: React.FC<DropdownProps> = ({
  dropdownTitle,
  dropdownItems,
  inputValue,
  isCreatable,
}) => {
  return (
    <div
      className={classNames(
        "shadow-elevationXS absolute -bottom-2 hidden w-full translate-y-full rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-400 peer-focus:block"
      )}
    >
      <p className="mb-3 font-medium text-neutral-900">{dropdownTitle}</p>
      <ul className="flex flex-col gap-3 ">
        {dropdownItems?.map(({ label, icon }, index) => (
          <DropdownItem
            label={label}
            icon={icon}
            value={inputValue}
            key={`${label}-${index}`}
          />
        ))}
      </ul>
      {isCreatable && (
        <div className="mt-3 border-t border-neutral-100 pt-3">
          <button className="flex items-center gap-2 text-sm text-blue-500">
            <PlusSvg className="aspect-square w-3" /> Add new
          </button>
        </div>
      )}
    </div>
  );
};

export const InputAutocomplete: React.FC<InputAutocompleteProps> = ({
  placeholder,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = (e: any) => setInputValue(e?.target?.value);
  const isTyping = !!inputValue;

  return (
    <>
      <Input.BaseInput
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        prefixVariant="icon"
        helpIcon={isTyping && <HelpCircleSvg className="h-4 w-4" />}
        className={classNames(
          "pl-1 focus:border-neutral-400 focus:shadow-none",
          !!isTyping && "focus:!border-blue-500"
        )}
      >
        <Input.Prefix
          prefixVariant="icon"
          prefixIcon={<SearchSvg className="block aspect-square h-5/6" />}
          className={classNames(
            "peer-focus:border-neutral-400 peer-focus:shadow-none",
            isTyping && "text-blue-500 peer-focus:!border-blue-500"
          )}
        />
        <Dropdown inputValue={inputValue} {...props} />
      </Input.BaseInput>
    </>
  );
};

export default InputAutocomplete;

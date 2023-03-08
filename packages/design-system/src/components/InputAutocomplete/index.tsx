import classNames from "classnames";
import * as Input from "components/Input";
import { useState } from "react";
import {
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
            <span className="font-icons text-base">&#xeac0;</span>Add
          </button>
        </div>
      )}
    </div>
  );
};

export const InputAutocomplete: React.FC<InputAutocompleteProps> = ({
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = (e: any) => setInputValue(e?.target?.value);
  const isTyping = !!inputValue;

  return (
    <>
      <Input.BaseInput
        onChange={(e) => onChange(e)}
        prefixVariant="icon"
        helpIcon={isTyping ? "&#xea2b" : undefined}
        className={classNames(
          "focus:border-neutral-400 focus:shadow-none",
          !!isTyping && "focus:!border-blue-500"
        )}
      >
        <Input.Prefix
          prefixVariant="icon"
          prefixIcon="&#xea37"
          className={classNames(
            "peer-focus:border-neutral-400 peer-focus:shadow-none",
            isTyping && "peer-focus:!border-blue-500"
          )}
          iconClassName={classNames(!!isTyping && "text-blue-500")}
        />
        <Dropdown inputValue={inputValue} {...props} />
      </Input.BaseInput>
    </>
  );
};

export default InputAutocomplete;
import classNames from "classnames";
import Button from "components/Button";
import IconButton from "components/IconButton";
import * as Input from "components/Input";
import { BaseInputProps } from "components/Input/Input.interface";
import { useState } from "react";

export interface SearchProps extends BaseInputProps {
  variant?: "default" | "withButton" | "withIconButton" | "inline";
  suffixText?: string;
}

export const Search: React.FC<SearchProps> = ({
  variant = "default",
  disabled,
  suffixText = "",
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = (e: any) => setInputValue(e?.target?.value);
  const isTyping = !!inputValue;

  const buttonStyles = classNames(
    "border-blue-500 bg-blue-500",
    "hover:border-blue-700 hover:bg-blue-700",
    "active:border-blue-800 active:bg-blue-800"
  );

  const suffixVariant = variant !== "inline" ? "dropdown" : undefined;
  const inlineVariantIconStyles = variant === "inline" && "text-base";
  const inlineSuffixAndPrefixVariantStyles =
    variant === "inline" && "!h-8 pl-2";
  const inlineInputVariantStyles =
    variant === "inline" &&
    classNames(
      "!h-8 py-2 pl-2 placeholder:text-sm placeholder-shown:text-ellipsis",
      isTyping ? "pr-8" : "pr-2"
    );

  return (
    <div
      className={classNames(
        "flex items-end gap-2",
        variant === "inline" && "!w-[100px]"
      )}
    >
      <Input.BaseInput
        suffixVariant={suffixVariant}
        prefixVariant="icon"
        onChange={(e) => onChange(e)}
        helpIcon={isTyping ? "&#xea2b" : undefined}
        disabled={disabled}
        className={classNames(
          "h-11 !text-neutral-400 focus:!border-blue-500 focus:shadow-none peer-focus:!border-blue-500 peer-focus:shadow-none",
          inlineInputVariantStyles
        )}
        {...props}
      >
        <Input.Prefix
          prefixVariant="icon"
          prefixIcon="&#xea37"
          className={classNames(
            "h-11 peer-focus:!border-blue-500 peer-focus:shadow-none",
            inlineSuffixAndPrefixVariantStyles
          )}
          iconClassName={classNames(
            inlineVariantIconStyles,
            isTyping && "text-blue-500"
          )}
        />
        <Input.Suffix
          suffixVariant={suffixVariant}
          suffixText={suffixText}
          className={classNames(
            "h-11 peer-focus:!border-blue-500 peer-focus:shadow-none",
            inlineSuffixAndPrefixVariantStyles
          )}
        />
      </Input.BaseInput>
      {variant === "withButton" && (
        <Button
          variant="primary"
          text="Search"
          disabled={disabled}
          className={buttonStyles}
        />
      )}
      {variant === "withIconButton" && (
        <IconButton
          variant="primary"
          icon="&#xea37"
          disabled={disabled}
          className={buttonStyles}
        />
      )}
    </div>
  );
};

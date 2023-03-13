import { useState } from "react";
import classNames from "classnames";
import HelpCircleSvg from "../../svgs/HelpCircleSvg";
import SearchSvg from "../../svgs/SearchSvg";
import Button from "../Button";
import IconButton from "../IconButton";
import * as Input from "../Input";
import type { SearchProps } from "./Search.interface";

export const Search: React.FC<SearchProps> = ({
  variant = "default",
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
        variant === "inline" && "min-w-min max-w-fit"
      )}
    >
      <Input.BaseInput
        suffixVariant={suffixVariant}
        prefixVariant="icon"
        onChange={(e) => onChange(e)}
        helpIcon={isTyping && <HelpCircleSvg className="h-4 w-4" />}
        className={classNames(
          "h-11 pl-0 !text-neutral-400 focus:!border-blue-500 focus:shadow-none peer-focus:!border-blue-500 peer-focus:shadow-none",
          inlineInputVariantStyles
        )}
        {...props}
      >
        <Input.Prefix
          prefixVariant="icon"
          prefixIcon={<SearchSvg className="block aspect-square h-5/6" />}
          className={classNames(
            "h-11 peer-focus:!border-blue-500 peer-focus:shadow-none",
            inlineSuffixAndPrefixVariantStyles,
            { "text-blue-500": isTyping }
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
        <Button variant="primary" text="Search" className={buttonStyles} />
      )}
      {variant === "withIconButton" && (
        <IconButton
          variant="primary"
          icon={<SearchSvg />}
          className={buttonStyles}
        />
      )}
    </div>
  );
};

export default Search;

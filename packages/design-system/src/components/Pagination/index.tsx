import classNames from "classnames";
import Icon from "../Icon";
import type {
  ArrowButtonProps,
  DotButtonProps,
  PageButtonProps,
  PaginationProps,
} from "./Pagination.interface";

const buildRange = (
  from: number,
  to: number,
  lowerLimit: number,
  upperLimit: number
) => {
  const range = [];
  let cursorPage = from;
  while (cursorPage <= to) {
    if (cursorPage >= lowerLimit && cursorPage <= upperLimit) {
      range.push(cursorPage);
    }
    cursorPage++;
  }
  return range;
};

const buildPagination = (
  pageCount: number,
  activePage: number,
  rangeSize: number
) => {
  const startRange = buildRange(1, rangeSize, 1, pageCount);
  const selectedRange = buildRange(
    activePage - (rangeSize - 1),
    activePage + (rangeSize - 1),
    1,
    pageCount
  );
  const endRange = buildRange(
    pageCount - (rangeSize - 1),
    pageCount,
    1,
    pageCount
  );

  const output = [...startRange];

  if (startRange[startRange.length - 1] < selectedRange[0] - 1) {
    output.push(-1);
  }

  output.push(...selectedRange);

  if (selectedRange[selectedRange.length - 1] < endRange[0] - 1) {
    output.push(-2);
  }

  output.push(...endRange);

  return Array.from(new Set(output));
};

const buttonVariants = {
  default: "border-neutral-400 border-1 border",
  outlined: "border-neutral-400 border-1 rounded-lg border",
  ghost: "",
};

const buttonArrowStyles = {
  default: "hover:bg-neutral-50",
  outlined: "bg-white hover:bg-neutral-50",
  ghost: "hover:text-neutral-700",
};

const buttonSizeStyles = {
  sm: "h-8 gap-2 py-2 px-3.5 text-sm",
  md: "h-11 text-base py-2.5 px-4 gap-2",
  lg: "h-12 gap-4 py-2.5 px-4 text-lg",
};

const buttonPageSizeStyles = {
  sm: "h-8 w-8 text-sm",
  md: "h-11 w-11 text-base",
  lg: "h-12 w-12 text-lg",
};

const buttonPageStateStyles = {
  default:
    "hover:bg-neutral-50 bg-white active:bg-neutral-100 focus:bg-neutral-50 focus:border-neutral-600",
  outlined:
    "hover:bg-neutral-50 bg-white active:bg-neutral-100 focus:bg-neutral-50",
  ghost: "hover:bg-neutral-50 active:bg-neutral-100 focus:bg-neutral-50",
};

const PaginationComponents = {
  ArrowButton: ({
    variant,
    size,
    direction,
    onClick,
    title,
  }: ArrowButtonProps) => (
    <button
      type={"button"}
      className={classNames(
        "flex items-center gap-2 font-medium text-neutral-400 transition hover:text-neutral-700",
        buttonVariants[variant],
        buttonArrowStyles[variant],
        buttonSizeStyles[size],
        direction === "left" && variant === "default" && "rounded-l-lg",
        direction === "right" && variant === "default" && "-ml-px rounded-r-lg"
      )}
      onClick={onClick}
    >
      <Icon
        //@TODO: Replace with SVG icons and rotate
        className={classNames({ "order-last": direction === "right" })}
        icon={direction === "left" ? "&#xeae8" : "&#xeb12"}
      />
      {title}
    </button>
  ),
  PageButton: ({
    variant,
    size,
    onPage,
    currentPage,
    title,
    active,
  }: PageButtonProps) => {
    return (
      <button
        type={"button"}
        className={classNames(
          "-ml-px flex shrink-0 items-center justify-center font-medium text-neutral-400 transition",
          buttonVariants[variant],
          buttonPageSizeStyles[size],
          buttonPageStateStyles[variant],
          active && "!bg-neutral-100"
        )}
        onClick={() => onPage(currentPage)}
      >
        {title}
      </button>
    );
  },
  DotButton: ({ variant, size }: DotButtonProps) => {
    return (
      <button
        type="button"
        className={classNames(
          "-ml-px flex shrink-0 items-center justify-center font-medium text-neutral-400 transition",
          buttonVariants[variant],
          buttonPageSizeStyles[size]
        )}
        disabled
      >
        ...
      </button>
    );
  },
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPage,
  onPrevious,
  onNext,
  variant,
  size,
  prevTitle,
  nextTitle,
}) => {
  const paginationVariants = {
    default: "",
    outlined: "gap-x-2",
    ghost: "gap-x-1",
  };

  return (
    <div
      className={classNames("flex items-center", paginationVariants[variant])}
    >
      <PaginationComponents.ArrowButton
        variant={variant}
        size={size}
        title={prevTitle}
        direction="left"
        onClick={onPrevious}
      />
      {buildPagination(totalPages, currentPage, 2).map((page) =>
        page === -1 || page === -2 ? (
          <PaginationComponents.DotButton
            variant={variant}
            size={size}
            key={page}
          />
        ) : (
          <PaginationComponents.PageButton
            variant={variant}
            size={size}
            key={page}
            currentPage={page}
            onPage={onPage}
            title={page.toString()}
            active={currentPage === page}
          />
        )
      )}
      <PaginationComponents.ArrowButton
        variant={variant}
        size={size}
        title={nextTitle}
        direction="right"
        onClick={onNext}
      />
    </div>
  );
};

export default Pagination;

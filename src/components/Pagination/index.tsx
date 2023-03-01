import classNames from "classnames";
import {
  ArrowButtonProps,
  DotButtonProps,
  PageButtonProps,
  PaginationProps,
} from "./Pagination.interface";
import {
  buttonArrowStyles,
  buttonPageSizeStyles,
  buttonPageStateStyles,
  buttonSizeStyles,
  buttonVariants,
  paginationVariants,
} from "./Pagination.styles";

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
      <span
        className={classNames(
          "font-icons",
          direction === "right" && "order-last"
        )}
        dangerouslySetInnerHTML={{
          __html: direction === "left" ? "&#xeaf5" : "&#xeb24",
        }}
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
        type={"button"}
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
  rangeSize,
}) => {
  return (
    <div
      className={classNames("flex items-center", paginationVariants[variant])}
    >
      <PaginationComponents.ArrowButton
        variant={variant}
        size={size}
        title={prevTitle}
        direction={"left"}
        onClick={onPrevious}
      />
      {buildPagination(totalPages, currentPage, rangeSize).map((page) =>
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
        direction={"right"}
        onClick={onNext}
      />
    </div>
  );
};

export default Pagination;

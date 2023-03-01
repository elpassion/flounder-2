export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPage: (page: number) => void;
  onPrevious: () => void;
  prevTitle: string;
  onNext: () => void;
  nextTitle: string;
  variant: "default" | "outlined" | "ghost";
  size: "sm" | "md" | "lg";
}

export interface ArrowButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    Pick<PaginationProps, "variant" | "size"> {
  direction: "left" | "right";
}

export interface PageButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    Pick<PaginationProps, "variant" | "size" | "onPage" | "currentPage"> {
  active: boolean;
}

export interface DotButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    Pick<PaginationProps, "variant" | "size"> {}

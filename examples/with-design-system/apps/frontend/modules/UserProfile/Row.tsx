interface RowProps {
  children: JSX.Element | JSX.Element[];
}

export const Row = ({ children }: RowProps) => {
  return <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 items-center">{children}</div>;
};

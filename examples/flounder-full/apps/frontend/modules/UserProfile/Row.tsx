interface RowProps {
  children: JSX.Element | JSX.Element[];
}

export const Row = ({ children }: RowProps) => {
  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 flex items-end">
      {children}
    </div>
  );
};

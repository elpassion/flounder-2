export interface IFormRowProps {
  children: JSX.Element | JSX.Element[];
}

export function Row({ children }: IFormRowProps) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      {children}
    </div>
  );
}

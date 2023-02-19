export interface FormColumnProps {
  children: JSX.Element | JSX.Element[];
}

export function Column({ children }: FormColumnProps) {
  return (
    <div className="flex flex-col sm:gap-2 sm:items-stretch sm:justify-start sm:border-t sm:border-gray-200 sm:pt-2">
      {children}
    </div>
  );
}

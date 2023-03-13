export interface IFormColumnProps {
  children: JSX.Element | JSX.Element[];
}

export function Column({ children }: IFormColumnProps) {
  return <div className="flex flex-col sm:gap-2 sm:items-stretch sm:justify-start">{children}</div>;
}

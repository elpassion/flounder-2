export interface HeaderSectionProps {
  children: JSX.Element | JSX.Element[];
}

export function HeaderSection({ children }: HeaderSectionProps) {
  return <div className="flex gap-2.5 items-center">{children}</div>;
}

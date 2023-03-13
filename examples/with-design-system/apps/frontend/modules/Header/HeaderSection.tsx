export interface IHeaderSectionProps {
  children: JSX.Element | JSX.Element[];
}

export function HeaderSection({ children }: IHeaderSectionProps) {
  return <div className="flex gap-2.5 items-center">{children}</div>;
}

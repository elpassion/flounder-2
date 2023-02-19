export interface InputContainerProps {
  children: JSX.Element | JSX.Element[];
}

export function InputContainer({ children }: InputContainerProps) {
  return <div className="mt-1 sm:mt-0 sm:col-span-2">{children}</div>;
}

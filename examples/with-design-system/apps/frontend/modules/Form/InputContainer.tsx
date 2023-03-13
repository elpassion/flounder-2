export interface IInputContainerProps {
  children: JSX.Element | JSX.Element[];
}

export function InputContainer({ children }: IInputContainerProps) {
  return <div className="sm:col-span-2">{children}</div>;
}

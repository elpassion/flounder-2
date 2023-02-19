interface ListProps {
  children: JSX.Element | JSX.Element[];
}

export const List = ({ children }: ListProps) => {
  return (
    <div className="mt-5 border-t border-gray-200">
      <div className="sm:divide-y sm:divide-gray-200">{children}</div>
    </div>
  );
};

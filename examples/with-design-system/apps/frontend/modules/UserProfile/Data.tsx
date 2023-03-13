interface DataProps {
  children: string;
}

export const Data = ({ children }: DataProps) => {
  return (
    <dd className="mt-1 text-md text-gray-800 sm:mt-0 sm:col-span-2">
      {children}
    </dd>
  );
};

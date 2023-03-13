interface LabelProps {
  children: string;
}

export const Label = ({ children }: LabelProps) => {
  return <dt className="text-sm font-medium text-gray-400">{children}</dt>;
};

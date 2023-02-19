import React from 'react';

interface FormHeaderProps {
  children: string | JSX.Element;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const FormHeader = ({ children, level }: FormHeaderProps) => {
  const CustomHeading = `h${level || 2}` as keyof JSX.IntrinsicElements;

  return (
    <CustomHeading className="text-lg sm:text-xl font-semibold mb-2">{children}</CustomHeading>
  );
};

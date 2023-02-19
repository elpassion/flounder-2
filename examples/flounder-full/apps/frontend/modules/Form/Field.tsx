import React, { useContext, createContext } from 'react';
import { useController, UseControllerReturn, useFormContext } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form';

export function Field({
  children,
  name,
}: {
  children: JSX.Element | JSX.Element[];
  name: string;
  options?: RegisterOptions;
}) {
  const { control } = useFormContext();
  const field = useController({
    name,
    control,
  });

  return <FieldContext.Provider value={field}>{children}</FieldContext.Provider>;
}

export const FieldContext = createContext<UseControllerReturn | null>(null);

export const useFieldContext = () => {
  const context = useContext(FieldContext);
  if (!context) throw new Error('You tried to use a field without using <FieldContext />');
  return context;
};

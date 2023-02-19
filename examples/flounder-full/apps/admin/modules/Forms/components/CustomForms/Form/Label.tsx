import { ReactNode } from 'react';
import { useFieldContext } from './Field';

export function Label({ children }: { children: ReactNode }) {
  const {
    field: { name },
  } = useFieldContext();
  return <label htmlFor={name}>{children}</label>;
}

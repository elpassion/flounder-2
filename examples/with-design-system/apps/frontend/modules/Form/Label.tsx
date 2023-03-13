import React, { ReactNode } from 'react';
import { Label as Labelled } from '@flounder/ui';
import { useFieldContext } from './Field';

export function Label({ children }: { children: ReactNode }) {
  const {
    field: { name },
  } = useFieldContext();
  return <Labelled htmlFor={name}>{children}</Labelled>;
}

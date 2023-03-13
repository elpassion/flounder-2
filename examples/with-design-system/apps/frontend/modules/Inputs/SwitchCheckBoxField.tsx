import React from 'react';
import { SwitchCheckBox, SwitchCheckBoxProps } from '@flounder/ui';
import { useFieldContext } from '../Form/Field';

export function SwitchCheckBoxField(props: SwitchCheckBoxProps) {
  const { field } = useFieldContext();
  return <SwitchCheckBox {...field} id={field.name} {...props} />;
}

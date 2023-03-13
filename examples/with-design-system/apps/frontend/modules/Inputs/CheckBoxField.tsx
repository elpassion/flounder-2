import React from 'react';
import { CheckBox, CheckBoxProps } from '@flounder/ui';
import { useFieldContext } from '../Form/Field';

export function CheckBoxField(props: CheckBoxProps) {
  const { field } = useFieldContext();
  return <CheckBox {...field} id={field.name} {...props} />;
}

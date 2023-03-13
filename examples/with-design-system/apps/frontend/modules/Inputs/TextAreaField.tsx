import React from 'react';
import { TextArea, TextAreaProps } from '@flounder/ui';
import { useFieldContext } from '../Form';

export function TextAreaField(props: TextAreaProps) {
  const { field } = useFieldContext();
  return <TextArea {...field} id={field.name} {...props} />;
}

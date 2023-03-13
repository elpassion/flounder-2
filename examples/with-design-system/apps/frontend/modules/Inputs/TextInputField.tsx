import React from 'react';
import { TextInputProps, Text } from '@flounder/ui';
import { useFieldContext } from '../Form';

export function TextInputField(props: TextInputProps) {
  const { field } = useFieldContext();
  return <Text {...field} id={field.name} {...props} />;
}

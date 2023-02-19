import React from 'react';
import { Input } from '@pankod/refine-antd';
import { TextInputProps } from '@flounder/ui';
import { useFieldContext } from '../Form';

export function TextInputField(props: TextInputProps) {
  const { field } = useFieldContext();
  return <Input {...field} id={field.name} style={{ width: 300, height: 35 }} />;
}

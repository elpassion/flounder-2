import { ReactNode } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { FormProps, Form as FormWrapper } from '@flounder/ui';

export function Form<T extends FieldValues>({
  methods,
  ...rest
}: { methods: UseFormReturn<T> } & FormProps & { submitButton?: () => ReactNode }) {
  return (
    <FormProvider {...methods}>
      <FormWrapper {...rest} />
    </FormProvider>
  );
}

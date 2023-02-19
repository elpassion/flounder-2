import { ReactNode } from 'react';
import { Button } from '@pankod/refine-antd';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { FormProps } from '@flounder/ui';

export function Form<T extends FieldValues>({
  methods,
  onSubmit,
  children,
  globalError,
  submitButtonText,
}: { methods: UseFormReturn<T> } & FormProps & { submitButton?: () => ReactNode }) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          {children}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" size="large" block htmlType={'submit'}>
              {submitButtonText}
            </Button>
          </div>
          <div>
            {globalError ? (
              <p style={{ color: 'red' }} role="note">
                {globalError ? globalError.message : ''}
              </p>
            ) : null}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

import React, { ReactNode, FC } from 'react';
import { Button, Form, FormProps } from '@pankod/refine-antd';

interface FilterProps {
  formProps: FormProps;
  children: ReactNode;
}

export const FilterForm: FC<FilterProps> = ({ formProps, children }) => {
  return (
    <Form layout="vertical" {...formProps}>
      {children}
      <Button htmlType="submit" type="primary">
        Filter
      </Button>
    </Form>
  );
};

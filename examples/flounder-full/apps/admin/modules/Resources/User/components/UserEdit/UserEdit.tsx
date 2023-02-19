import React from 'react';
import { Edit, Form, Input, useForm } from '@pankod/refine-antd';
import { WysiwygEditor } from '@flounder/ui';
import { useHttpFormValidationError, ValidatedFieldWrapper } from '../../../../Forms';

const fieldNames = {
  firstName: 'first_name',
  lastName: 'last_name',
  description: 'description',
};

export const UserEdit = () => {
  const { fieldErrors, defineFieldValidationHttpError, resetFieldErrors } =
    useHttpFormValidationError(fieldNames);

  const { firstName, lastName, description } = fieldNames;

  const { formProps, saveButtonProps } = useForm({
    queryOptions: {
      refetchOnWindowFocus: false,
    },
    successNotification: {
      // title of notification
      description: 'Success',
      type: 'success',
      message: 'User successfully updated',
    },
    onMutationError: error => {
      defineFieldValidationHttpError(error);
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <ValidatedFieldWrapper fieldErrors={fieldErrors?.firstName} formFieldName={firstName}>
          <Form.Item
            label="First Name"
            name={firstName}
            validateStatus={fieldErrors?.firstName ? 'error' : ''}
          >
            <Input onChange={() => resetFieldErrors(firstName)} />
          </Form.Item>
        </ValidatedFieldWrapper>

        <ValidatedFieldWrapper fieldErrors={fieldErrors?.lastName} formFieldName={lastName}>
          <Form.Item
            label="Last Name"
            name={lastName}
            validateStatus={fieldErrors?.lastName ? 'error' : ''}
          >
            <Input onChange={() => resetFieldErrors(lastName)} />
          </Form.Item>
        </ValidatedFieldWrapper>

        <ValidatedFieldWrapper fieldErrors={fieldErrors?.description} formFieldName={description}>
          <Form.Item label="Description" name={description}>
            <WysiwygEditor />
          </Form.Item>
        </ValidatedFieldWrapper>
      </Form>
    </Edit>
  );
};

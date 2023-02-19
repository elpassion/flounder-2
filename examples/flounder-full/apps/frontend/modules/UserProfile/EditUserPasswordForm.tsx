import React, { FC } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useChangePassword, getCognitoErrorText } from '@flounder/cognito-auth';
import { ChangePasswordDto } from '@flounder/contracts';
import { ErrorMessage, Field, Form, Label } from 'modules/Form';
import { TextInputField } from 'modules/Inputs';
import { successToast } from '../Toast';
import { Row } from './Row';

export const EditUserPasswordForm: FC = () => {
  const { isProcessing, changePassword } = useChangePassword();

  const methods = useForm<ChangePasswordDto & { global: string }>({
    resolver: classValidatorResolver(ChangePasswordDto),
    mode: 'onChange',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const handleChangePassword = async (data: ChangePasswordDto) => {
    try {
      await changePassword(data).then(() =>
        successToast({ description: 'Password successfully changed' }),
      );
    } catch (error) {
      const errorText = getCognitoErrorText(error);
      setError('global', { message: errorText });
    }
  };

  const onSubmit: SubmitHandler<ChangePasswordDto> = data => handleChangePassword(data);

  return (
    <div className="pt-3">
      <div className="flex flex-col">
        <div className="inline-block relative">
          <Form
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            globalError={errors.global}
            submitButtonText={isProcessing ? 'Changing...' : 'Change my password'}
          >
            <Field name="oldPassword">
              <Row>
                <Label>Old password:</Label>
                <TextInputField type="password" />
                <ErrorMessage />
              </Row>
            </Field>
            <Field name="newPassword">
              <Row>
                <Label>New password:</Label>
                <TextInputField type="password" />
                <ErrorMessage />
              </Row>
            </Field>
            <Field name="repeatNewPassword">
              <Row>
                <Label>Repeat new password:</Label>
                <TextInputField type="password" />
                <ErrorMessage />
              </Row>
            </Field>
          </Form>
        </div>
      </div>
    </div>
  );
};

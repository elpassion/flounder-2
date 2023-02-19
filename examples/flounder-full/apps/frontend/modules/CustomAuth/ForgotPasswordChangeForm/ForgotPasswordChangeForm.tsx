import React, { useState } from 'react';
import Link from 'next/link';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useResetPassword, CognitoError } from '@flounder/cognito-auth';
import { ConfirmForgotPasswordDto } from '@flounder/contracts';
import { Column, InputContainer } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { ErrorMessage, Field, Form, Label } from 'modules/Form';
import { PasswordInputField, TextInputField } from 'modules/Inputs';
import { FormHeader } from '../components/FormHeader';
import { getMaskedEmail } from '../utils';
import { messages } from './messages';

interface ForgotPasswordChangeFormProps {
  email: string;
}

export const ForgotPasswordChangeForm = ({ email }: ForgotPasswordChangeFormProps) => {
  const [isPasswordSuccessfullyChanged, setIsPasswordSuccessfullyChanged] = useState(false);
  const { changePasswordSubmit } = useResetPassword();
  const intl = useIntl();

  const maskedEmail = getMaskedEmail(email);

  const methods = useForm<ConfirmForgotPasswordDto & { global: string }>({
    resolver: classValidatorResolver(ConfirmForgotPasswordDto),
    mode: 'onChange',
    defaultValues: {
      code: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    criteriaMode: 'all',
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const handlePasswordChangeSubmit = async ({ newPassword, code }: ConfirmForgotPasswordDto) => {
    try {
      await changePasswordSubmit({ email, code, password: newPassword });
      setIsPasswordSuccessfullyChanged(true);
    } catch (error) {
      const cognitoError = error as CognitoError;
      setIsPasswordSuccessfullyChanged(false);
      setError('global', { message: cognitoError.message });
    }
  };

  const onSubmit: SubmitHandler<ConfirmForgotPasswordDto> = data =>
    handlePasswordChangeSubmit(data);

  if (isPasswordSuccessfullyChanged)
    return (
      <div className="max-w-md w-full text-center">
        <FormHeader>
          <FormattedMessage {...messages.passwordChangedTitle} />
        </FormHeader>
        <p>
          <FormattedMessage {...messages.passwordChangedDescription} />
        </p>
        <p className="mt-3">
          <FormattedMessage {...messages.loginInstructionPreLinkPart} />{' '}
          <Link href="/customauth/customsignin">
            <span className="font-medium text-indigo-600 hover:text-indigo-500">
              <FormattedMessage {...messages.loginInstructionLinkText} />
            </span>
          </Link>{' '}
          <FormattedMessage {...messages.loginInstructionPostLinkPart} />
        </p>
      </div>
    );

  return (
    <div className="max-w-xs w-full">
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        globalError={errors.global}
        submitButtonText={intl.formatMessage(common.changePassword)}
        submitButtonFullWidth
      >
        <div className="text-sm">
          <FormattedMessage {...messages.sentPasswordInfo} values={{ maskedEmail }} />
        </div>
        <Field name="code">
          <Column>
            <Label>
              <FormattedMessage {...common.code} />
            </Label>
            <InputContainer>
              <TextInputField />
              <ErrorMessage />
            </InputContainer>
          </Column>
        </Field>
        <Field name="newPassword">
          <Column>
            <Label>
              <FormattedMessage {...messages.newPassword} />
            </Label>
            <InputContainer>
              <PasswordInputField />
            </InputContainer>
          </Column>
        </Field>
        <Field name="repeatNewPassword">
          <Column>
            <Label>
              <FormattedMessage {...messages.repeatNewPassword} />
            </Label>
            <InputContainer>
              <PasswordInputField />
            </InputContainer>
          </Column>
        </Field>
      </Form>
    </div>
  );
};

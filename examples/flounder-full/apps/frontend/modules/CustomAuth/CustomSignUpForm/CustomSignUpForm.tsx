import React from 'react';
import Link from 'next/link';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { SignUpDto } from '@flounder/contracts';
import { Column, InputContainer } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { userAuthApi } from 'modules/Api/Auth';
import { ErrorMessage, Field, Form, Label } from 'modules/Form';
import { PasswordInputField, TextInputField } from 'modules/Inputs';
import { FacebookButton } from '../components/FacebookButton';
import { GoogleButton, GoogleButtonType } from '../components/GoogleButton';
import { messages } from './messages';

interface CustomSignUpFormProps {
  onSignedUp: (email: string) => void;
}

export const CustomSignUpForm = ({ onSignedUp }: CustomSignUpFormProps) => {
  const intl = useIntl();

  const { useRegisterAccount } = userAuthApi();
  const methods = useForm<SignUpDto & { global: string }>({
    resolver: classValidatorResolver(SignUpDto),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    criteriaMode: 'all',
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = methods;

  const { mutate, isLoading } = useRegisterAccount({
    onSuccess: () => {
      onSignedUp(getValues('email'));
    },
    onError: error => {
      if (Array.isArray(error?.response?.data?.message)) {
        console.log('Handle array type errors!');
      } else {
        const err = error as AxiosError<{ message: string }>;
        setError('global', {
          message: err.response?.data.message,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<SignUpDto> = data => {
    if (isLoading) return;
    mutate(data);
  };

  return (
    <div className="max-w-xs w-full">
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        globalError={errors.global}
        submitButtonText={intl.formatMessage(common.signUp)}
        submitButtonFullWidth
      >
        <Field name="email">
          <Column>
            <Label>
              <FormattedMessage {...common.email} />
            </Label>
            <InputContainer>
              <TextInputField />
              <ErrorMessage />
            </InputContainer>
          </Column>
        </Field>

        <Field name="password">
          <Column>
            <Label>
              <FormattedMessage {...common.password} />
            </Label>
            <InputContainer>
              <PasswordInputField />
            </InputContainer>
          </Column>
        </Field>
      </Form>
      <GoogleButton fullWidth className="my-2" type={GoogleButtonType.SIGN_UP} />
      <FacebookButton fullWidth />
      <div className="text-sm mt-4 text-center">
        <FormattedMessage {...messages.alreadyHaveAccount} />
        &nbsp;
        <Link href="/customauth/customsignin">
          <span className="font-medium text-indigo-600 hover:text-indigo-500">
            <FormattedMessage {...common.signIn} />
          </span>
        </Link>
      </div>
    </div>
  );
};

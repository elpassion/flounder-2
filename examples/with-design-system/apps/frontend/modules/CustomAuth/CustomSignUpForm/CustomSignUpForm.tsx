import React from 'react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { Button } from 'elp-taco-ui';
import { nestJsZodResolver } from 'nestjs-zod-hookform-resolver';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { FacebookButton, GoogleButton } from '@flounder/cognito-auth';
import { signUpSchema, TSignIn, TSignUp } from '@flounder/contracts';
import { common } from 'lang/messages/common';
import { userAuthApi } from 'modules/Api/Auth';
import { ErrorMessage, Field, Form, Label, Column, InputContainer, Submit } from 'modules/Form';
import { PasswordInputField, TextInputField } from 'modules/Inputs';
import { routes } from 'utils/routes';
import { messages } from './messages';

interface ICustomSignUpFormProps {
  onSignedUp: (data: TSignIn) => void;
}

export const CustomSignUpForm = ({ onSignedUp }: ICustomSignUpFormProps) => {
  const intl = useIntl();

  const { useRegisterAccount } = userAuthApi();
  const methods = useForm<TSignUp & { global: string }>({
    resolver: nestJsZodResolver(signUpSchema),
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
      onSignedUp({
        mail: getValues('email'),
        password: getValues('password'),
      });
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

  const onSubmit: SubmitHandler<TSignUp> = data => {
    mutate(data);
  };

  return (
    <div className="max-w-xs w-full">
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        globalError={errors.global}
        submitButton={
          <Button
            size="md"
            text={intl.formatMessage(common.signUp)}
            variant="primary"
            isFluid
            type="submit"
          />
        }
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
      <GoogleButton fullWidth className="mb-3" text={intl.formatMessage(common.googleSignUp)} />
      <FacebookButton fullWidth text={intl.formatMessage(common.facebookSignIn)} />
      <div className="text-sm pt-4 text-center">
        <FormattedMessage {...messages.alreadyHaveAccount} />
        &nbsp;
        <Link href={routes.login}>
          <span className="font-medium text-indigo-600 hover:text-indigo-500">
            <FormattedMessage {...common.signIn} />
          </span>
        </Link>
      </div>
    </div>
  );
};

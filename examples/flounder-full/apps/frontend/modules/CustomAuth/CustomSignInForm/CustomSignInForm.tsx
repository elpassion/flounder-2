import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSignIn, getCognitoErrorText, CognitoAppErrorMessages } from '@flounder/cognito-auth';
import { SignInDto } from '@flounder/contracts';
import { Column, InputContainer } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { ConfirmSignUpForm } from 'modules/CustomAuth/ConfirmSignUpForm';
import { ErrorMessage, Field, Form, Label } from 'modules/Form';
import { TextInputField } from 'modules/Inputs';
import { FacebookButton } from '../components/FacebookButton';
import { GoogleButton, GoogleButtonProps, GoogleButtonType } from '../components/GoogleButton';
import { messages } from './messages';

export const CustomSignInForm = () => {
  const [notConfirmedUserEmail, setNotConfirmedUserEmail] = useState<string>();
  const [notConfirmedErrorText, setNotConfirmedErrorText] = useState<string>();
  const { signIn } = useSignIn();
  const router = useRouter();
  const intl = useIntl();

  const methods = useForm<SignInDto & { global: string }>({
    resolver: classValidatorResolver(SignInDto),
    defaultValues: {
      mail: '',
      password: '',
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const handleSignIn = async (data: SignInDto) => {
    try {
      const credentials = { mail: data.mail, password: data.password };
      await signIn(credentials);
      await router.push('/');
    } catch (error) {
      const errorText = getCognitoErrorText(error);
      if (errorText === CognitoAppErrorMessages.UserNotConfirmed) {
        setNotConfirmedUserEmail(data.mail);
        setNotConfirmedErrorText(errorText);
      }
      setError('global', {
        message: errorText,
      });
    }
  };

  const onSubmit: SubmitHandler<SignInDto> = async data => await handleSignIn(data);

  return notConfirmedUserEmail ? (
    <ConfirmSignUpForm email={notConfirmedUserEmail} error={{ message: notConfirmedErrorText }} />
  ) : (
    <div className="max-w-xs w-full">
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        globalError={errors.global}
        submitButtonText={intl.formatMessage(common.signIn)}
        submitButtonFullWidth
      >
        <Field name="mail">
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
              <TextInputField type="password" />
              <ErrorMessage />
              <div className="text-sm">
                <Link href="/customauth/forgotpassword">
                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    <FormattedMessage {...messages.forgotPassword} />
                  </span>
                </Link>
              </div>
            </InputContainer>
          </Column>
        </Field>
      </Form>
      <GoogleButton fullWidth className="my-2" type={GoogleButtonType.SIGN_IN} />
      <FacebookButton fullWidth />
      <div className="text-sm mt-4 text-center">
        <FormattedMessage {...messages.needAccount} />
        &nbsp;
        <Link href="/customauth/customsignup">
          <span className="font-medium text-indigo-600 hover:text-indigo-500">
            <FormattedMessage {...common.signUp} />
          </span>
        </Link>
      </div>
    </div>
  );
};

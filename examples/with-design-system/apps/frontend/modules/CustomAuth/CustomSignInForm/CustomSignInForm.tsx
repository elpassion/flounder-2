import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'elp-taco-ui';
import { nestJsZodResolver } from 'nestjs-zod-hookform-resolver';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  useSignIn,
  getCognitoErrorText,
  CognitoAppErrorMessages,
  GoogleButton,
  FacebookButton,
} from '@flounder/cognito-auth';
import { signInSchema, TSignIn } from '@flounder/contracts';
import { common } from 'lang/messages/common';
import { ConfirmSignUpForm } from 'modules/CustomAuth/ConfirmSignUpForm';
import { ErrorMessage, Field, Form, Label, Column, InputContainer } from 'modules/Form';
import { TextInputField } from 'modules/Inputs';
import { routes } from 'utils/routes';
import { messages } from './messages';

export const CustomSignInForm = () => {
  const [newRegisteredUser, setNewRegisteredUser] = useState<TSignIn>();
  const [notConfirmedErrorText, setNotConfirmedErrorText] = useState<string>();
  const { signIn } = useSignIn();
  const router = useRouter();
  const intl = useIntl();

  const redirectUrl = (
    router.query?.redirect ? `/${router.query.redirect}` : routes.home
  ) as string;

  const methods = useForm<TSignIn & { global: string }>({
    resolver: nestJsZodResolver(signInSchema),
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

  const handleSignIn = async (data: TSignIn) => {
    try {
      const credentials = { mail: data.mail, password: data.password };
      await signIn(credentials);
      await router.push(redirectUrl);
    } catch (error) {
      const errorText = getCognitoErrorText(error);
      if (errorText === CognitoAppErrorMessages.UserNotConfirmed) {
        setNewRegisteredUser(data);
        setNotConfirmedErrorText(errorText);
      }
      setError('global', {
        message: errorText,
      });
    }
  };

  const onSubmit: SubmitHandler<TSignIn> = async data => await handleSignIn(data);

  return newRegisteredUser ? (
    <ConfirmSignUpForm
      newRegisteredUser={newRegisteredUser}
      error={{ message: notConfirmedErrorText }}
    />
  ) : (
    <div className="max-w-xs w-full">
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        globalError={errors.global}
        submitButton={
          <Button
            size="md"
            text={intl.formatMessage(common.signIn)}
            variant="primary"
            isFluid
            type="submit"
          />
        }
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
            </InputContainer>
            <p className="text-sm">
              <Link
                href={routes.forgotPassword}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                <FormattedMessage {...messages.forgotPassword} />
              </Link>
            </p>
          </Column>
        </Field>
      </Form>

      <GoogleButton fullWidth className="mb-2" text={intl.formatMessage(common.googleSignIn)} />
      <FacebookButton fullWidth text={intl.formatMessage(common.facebookSignIn)} />
      <div className="text-sm pt-4 text-center">
        <FormattedMessage {...messages.needAccount} />
        &nbsp;
        <Link href={routes.signUp}>
          <span className="font-medium text-indigo-600 hover:text-indigo-500">
            <FormattedMessage {...common.signUp} />
          </span>
        </Link>
      </div>
    </div>
  );
};

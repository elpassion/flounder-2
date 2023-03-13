import React, { useState } from 'react';
import { Button } from 'elp-taco-ui';
import { nestJsZodResolver } from 'nestjs-zod-hookform-resolver';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useResetPassword, CognitoContext, getCognitoErrorText } from '@flounder/cognito-auth';
import { TForgotPassword, forgotPasswordSchema } from '@flounder/contracts';
import { common } from 'lang/messages/common';
import { ErrorMessage, Field, Form, Column, InputContainer } from 'modules/Form';
import { TextInputField } from 'modules/Inputs';
import { FormHeader } from '../components/FormHeader';
import { ForgotPasswordChangeForm } from '../ForgotPasswordChangeForm';
import { messages } from './messages';

export const ForgotPasswordForm = () => {
  // comment first line before & uncomment second for testing validation without request
  // check validation error in console - property `types`
  const [userEmail, setUserEmail] = useState('');
  // const [userEmail, setUserEmail] = useState('test+1234@elpassion.pl');
  const { resetPassword } = useResetPassword();
  const intl = useIntl();

  const methods = useForm<TForgotPassword & { global: string }>({
    resolver: nestJsZodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const handleResetPassword = async (data: TForgotPassword) => {
    // with Prevent User Existence Errors set to Enabled (Recommended)
    // Cognito doesn't send error about non-existence account
    // just doesn't send code
    // for more info consult: https://stackoverflow.com/questions/65019768/aws-amplify-amplify-js-forgotpassword-returns-no-error-with-invalid-username
    try {
      const { email } = data;
      await resetPassword(email);
      setUserEmail(data.email);
    } catch (error) {
      const errorText = getCognitoErrorText(error, {
        errorContext: CognitoContext.ResetPassword,
        generalErrorText: intl.formatMessage(messages.generalResetPasswordError),
      });
      setError('global', { message: errorText });
    }
  };

  const onSubmit: SubmitHandler<TForgotPassword> = data => handleResetPassword(data);

  return !userEmail ? (
    <>
      <FormHeader>
        <FormattedMessage {...messages.forgotPassword} />
      </FormHeader>

      <div className="max-w-xs w-full">
        <Form
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
          globalError={errors.global}
          submitButton={
            <Button
              size="md"
              text={intl.formatMessage(messages.resetMyPassword)}
              variant="primary"
              isFluid
              type="submit"
            />
          }
        >
          <div className="text-sm">
            <FormattedMessage {...messages.resetPasswordInstruction} />
          </div>
          <div className="pt-4">
            <Field name="email">
              <Column>
                <InputContainer>
                  <TextInputField placeholder={intl.formatMessage(common.email)} />
                  <ErrorMessage />
                </InputContainer>
              </Column>
            </Field>
          </div>
        </Form>
      </div>
    </>
  ) : (
    <ForgotPasswordChangeForm email={userEmail} />
  );
};

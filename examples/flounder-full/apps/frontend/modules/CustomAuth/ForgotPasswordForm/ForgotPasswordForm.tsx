import React, { useState } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useResetPassword, CognitoContext, getCognitoErrorText } from '@flounder/cognito-auth';
import { ForgotPasswordDto } from '@flounder/contracts';
import { Column, InputContainer } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { ErrorMessage, Field, Form } from 'modules/Form';
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

  const methods = useForm<ForgotPasswordDto & { global: string }>({
    resolver: classValidatorResolver(ForgotPasswordDto),
    defaultValues: {
      email: '',
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const handleResetPassword = async (data: ForgotPasswordDto) => {
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

  const onSubmit: SubmitHandler<ForgotPasswordDto> = data => handleResetPassword(data);

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
          submitButtonText={intl.formatMessage(messages.resetMyPassword)}
          submitButtonFullWidth
        >
          <div className="text-sm">
            <FormattedMessage {...messages.resetPasswordInstruction} />
          </div>
          <Field name="email">
            <Column>
              <InputContainer>
                <TextInputField placeholder={intl.formatMessage(common.email)} />
                <ErrorMessage />
              </InputContainer>
            </Column>
          </Field>
        </Form>
      </div>
    </>
  ) : (
    <ForgotPasswordChangeForm email={userEmail} />
  );
};

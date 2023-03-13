import React, { useState } from 'react';
import Link from 'next/link';
import { nestJsZodResolver } from 'nestjs-zod-hookform-resolver';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useResetPassword, CognitoError } from '@flounder/cognito-auth';
import { TConfirmPassword, confirmForgotPasswordSchema } from '@flounder/contracts';
import { common } from 'lang/messages/common';
import { FormHeader } from 'modules/CustomAuth/components/FormHeader';
import { ErrorMessage, Field, Form, Label, Column, InputContainer, Submit } from 'modules/Form';
import { PasswordInputField, TextInputField } from 'modules/Inputs';
import { getMaskedEmail } from 'utils/customAuth';
import { routes } from 'utils/routes';
import { messages } from './messages';

export const ForgotPasswordChangeForm = ({ email }: { email: string }) => {
  const [isPasswordSuccessfullyChanged, setIsPasswordSuccessfullyChanged] = useState(false);
  const { changePasswordSubmit } = useResetPassword();
  const intl = useIntl();

  const maskedEmail = getMaskedEmail(email);

  const methods = useForm<TConfirmPassword & { global: string }>({
    resolver: nestJsZodResolver(confirmForgotPasswordSchema),
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

  const handlePasswordChangeSubmit = async ({ newPassword, code }: TConfirmPassword) => {
    try {
      await changePasswordSubmit({ email, code, password: newPassword });
      setIsPasswordSuccessfullyChanged(true);
    } catch (error) {
      const cognitoError = error as CognitoError;
      setIsPasswordSuccessfullyChanged(false);
      setError('global', { message: cognitoError.message });
    }
  };

  const onSubmit: SubmitHandler<TConfirmPassword> = data => handlePasswordChangeSubmit(data);

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
          <Link href={routes.login}>
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
        submitButton={<Submit text={intl.formatMessage(common.changePassword)} fullWidth />}
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

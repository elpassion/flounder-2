import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useConfirmUser, getCognitoErrorText } from '@flounder/cognito-auth';
import { ConfirmSignUpDto } from '@flounder/contracts';
import { ErrorMessage as Error, Link, Column, InputContainer } from '@flounder/ui';
import { ErrorMessage, Field, Form, Label } from 'modules/Form';
import { TextInputField } from 'modules/Inputs';
import { getMaskedEmail } from '../utils';
import { messages } from './messages';

interface ConfirmSignUpFormProps {
  email: string;
  error?: { message?: string };
}

export const ConfirmSignUpForm = ({ email, error }: ConfirmSignUpFormProps) => {
  const [, setProcessing] = useState(false);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [notConfirmedError, setNotConfirmedError] = useState<
    { message?: string | undefined } | undefined
  >(error);
  const router = useRouter();

  const { confirmUser, resendConfirmationCode } = useConfirmUser();
  const intl = useIntl();

  const maskedEmail = getMaskedEmail(email);

  const methods = useForm<ConfirmSignUpDto & { global: string }>({
    resolver: classValidatorResolver(ConfirmSignUpDto),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const onSubmit: SubmitHandler<ConfirmSignUpDto> = async data => {
    try {
      setProcessing(true);
      await confirmUser(email, data.code);
      router.push('/');
    } catch (error) {
      const errorText = getCognitoErrorText(error);
      setError('global', { message: errorText });
    } finally {
      setProcessing(false);
      setNotConfirmedError(undefined);
    }
  };

  const resendCode = async () => {
    try {
      await resendConfirmationCode(email);
      setCodeSent(true);
    } catch (error) {
      const errorText = getCognitoErrorText(error);
      setError('global', { message: errorText });
    }
  };

  return (
    <div className="max-w-xs w-full">
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        globalError={errors.global}
        submitButtonText={intl.formatMessage(messages.confirmAccount)}
        submitButtonFullWidth
      >
        <div className="text-sm">
          <FormattedMessage {...messages.codeSentSuccess} values={{ maskedEmail }} />
        </div>
        <Field name="code">
          <Column>
            <Label>
              <FormattedMessage {...messages.verificationCode} />
            </Label>
            <InputContainer>
              <TextInputField />
              <ErrorMessage />
            </InputContainer>
          </Column>
        </Field>
      </Form>
      <Error error={notConfirmedError} />
      <div className="text-sm text-center mt-4">
        {codeSent ? (
          <FormattedMessage {...messages.codeSent} />
        ) : (
          <FormattedMessage {...messages.noCodeReceived} />
        )}
        &nbsp;
        <Link onClick={resendCode}>
          <FormattedMessage {...messages.sendNewCode} />
        </Link>
      </div>
    </div>
  );
};

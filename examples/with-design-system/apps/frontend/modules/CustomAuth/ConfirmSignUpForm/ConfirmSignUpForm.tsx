import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { nestJsZodResolver } from 'nestjs-zod-hookform-resolver';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useConfirmUser, getCognitoErrorText, useSignIn } from '@flounder/cognito-auth';
import { ConfirmSignUpDto, confirmSignUpSchema, TSignIn } from '@flounder/contracts';
import { ErrorMessage as Error, Link } from '@flounder/ui';
import { ErrorMessage, Field, Form, Label, Column, InputContainer, Submit } from 'modules/Form';
import { TextInputField } from 'modules/Inputs';
import { getMaskedEmail } from 'utils/customAuth';
import { routes } from 'utils/routes';
import { messages } from './messages';

interface ConfirmSignUpFormProps {
  newRegisteredUser: TSignIn;
  error?: { message?: string };
}

export const ConfirmSignUpForm = ({ newRegisteredUser, error }: ConfirmSignUpFormProps) => {
  const [, setProcessing] = useState(false);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [notConfirmedError, setNotConfirmedError] = useState<
    { message?: string | undefined } | undefined
  >(error);
  const router = useRouter();

  const { mail } = newRegisteredUser;

  const { confirmUser, resendConfirmationCode } = useConfirmUser();
  const { signIn } = useSignIn();
  const intl = useIntl();

  const maskedEmail = getMaskedEmail(mail);

  const methods = useForm<ConfirmSignUpDto & { global: string }>({
    resolver: nestJsZodResolver(confirmSignUpSchema),
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
      await confirmUser(mail, data.code);
      await signIn(newRegisteredUser);
      router.push(routes.home);
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
      await resendConfirmationCode(mail);
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
        submitButton={<Submit text={intl.formatMessage(messages.confirmAccount)} fullWidth />}
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

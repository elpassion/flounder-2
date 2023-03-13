import React, { useState } from 'react';
import { nestJsZodResolver } from 'nestjs-zod-hookform-resolver';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { mailExampleSchema, TMailExample } from '@flounder/contracts';
import { Button } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { ErrorMessage, Field, Form, Label, InputContainer } from 'modules/Form';
import { TextAreaField, TextInputField } from 'modules/Inputs';
import { Row } from 'modules/UserProfile/Row';
import { errorToast, successToast } from '../../Toast';
import { useSendMailTemplate } from './hooks';
import { messages } from './messages';

export const SendEmailTemplateForm = () => {
  const intl = useIntl();
  const methods = useForm<TMailExample & { global: string }>({
    resolver: nestJsZodResolver(mailExampleSchema),
    defaultValues: {
      to: '',
      subject: '',
      text: '',
    },
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;

  const { useSendEmail } = useSendMailTemplate();
  const [success, setSuccess] = useState(false);

  const { mutate } = useSendEmail({
    onSuccess: () => {
      reset();
      setSuccess(true);
      successToast({
        title: intl.formatMessage(common.toastSuccessTitle),
        description: intl.formatMessage(messages.toastSuccessContent),
      });
    },
    onError: () => {
      setError('global', {
        message: 'Oops. We cannot handle your request right now. Try again later',
      });
      errorToast({
        title: intl.formatMessage(common.toastErrorTitle),
        description: intl.formatMessage(messages.toastErrorContent),
      });
    },
  });

  const onSubmit: SubmitHandler<TMailExample> = data => mutate(data);

  if (success) {
    return (
      <>
        <p className="mb-6">
          <FormattedMessage {...messages.successMessage} />
        </p>
        <Button onClick={() => setSuccess(false)}>
          <FormattedMessage {...messages.successButton} />
        </Button>
      </>
    );
  }

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)} globalError={errors.global}>
      <Field name="to">
        <Row>
          <Label>
            <FormattedMessage {...common.email} />
          </Label>
          <InputContainer>
            <TextInputField />
            <ErrorMessage />
          </InputContainer>
        </Row>
      </Field>
      <Field name="subject">
        <Row>
          <Label>
            <FormattedMessage {...common.title} />
          </Label>
          <InputContainer>
            <TextInputField />
            <ErrorMessage />
          </InputContainer>
        </Row>
      </Field>
      <Field name="text">
        <Row>
          <Label>
            <FormattedMessage {...messages.body} />
          </Label>
          <InputContainer>
            <TextAreaField rows={4} />
            <ErrorMessage />
          </InputContainer>
        </Row>
      </Field>
    </Form>
  );
};

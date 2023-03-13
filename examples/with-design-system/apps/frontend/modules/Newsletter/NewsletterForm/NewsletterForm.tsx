import React, { useState } from 'react';
import { nestJsZodResolver } from 'nestjs-zod-hookform-resolver';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { TCreateEmailSubscription, ConflictError, createEmailSubscriptionSchema } from '@flounder/contracts';
import { common } from 'lang/messages/common';
import { ErrorMessage, Field, Form, Label, Row, InputContainer } from 'modules/Form';
import { TextInputField } from 'modules/Inputs';
import { CheckBoxField } from 'modules/Inputs/CheckBoxField';
import { useNewsletter } from './hooks';
import { messages } from './messages';

export const NewsletterForm = () => {
  const intl = useIntl();
  const methods = useForm<TCreateEmailSubscription & { global: string }>({
    resolver: nestJsZodResolver(createEmailSubscriptionSchema),
    defaultValues: { email: '' },
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;

  const { useSignUp } = useNewsletter();
  const [success, setSuccess] = useState(false);

  const { mutate } = useSignUp({
    onSuccess: () => {
      reset();
      setSuccess(true);
    },
    onError: error => {
      if (error instanceof ConflictError) {
        setError('email', { message: 'Email already taken' });
      } else {
        setError('global', {
          message: 'Oops. We cannot handle your request right now. Try again later',
        });
      }
    },
  });

  const checkBoxName = 'agreedToTerms';

  const onSubmit: SubmitHandler<TCreateEmailSubscription> = data => mutate(data);

  if (success)
    return (
      <p className="min-h-[44px]">
        <FormattedMessage {...messages.successMessage} />
      </p>
    );

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)} globalError={errors.global}>
      <Field name="email">
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
      <Field name={checkBoxName}>
        <Row>
          <Label>
            <FormattedMessage {...common.termsAndConditions} />
          </Label>
          <InputContainer>
            <CheckBoxField
              text={intl.formatMessage(messages.agreeHeader)}
              description={intl.formatMessage(messages.agreeDescription)}
            />
            <ErrorMessage />
          </InputContainer>
        </Row>
      </Field>
    </Form>
  );
};

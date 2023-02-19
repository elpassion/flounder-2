import React, { useEffect, useState } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { CreateEmailSubscriptionDto, ConflictError } from '@flounder/contracts';
import { InputContainer, Row } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { ErrorMessage, Field, Form, Label } from 'modules/Form';
import { TextInputField } from 'modules/Inputs';
import { CheckBoxField } from 'modules/Inputs/CheckBoxField';
import { useNewsletter } from './hooks';
import { messages } from './messages';

export const NewsletterForm = () => {
  const intl = useIntl();
  const methods = useForm<CreateEmailSubscriptionDto & { global: string }>({
    resolver: classValidatorResolver(CreateEmailSubscriptionDto),
    defaultValues: { email: '', agreedToTerms: true },
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
    setValue,
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

  useEffect(() => setValue(checkBoxName, true, { shouldValidate: true }), []);

  const onSubmit: SubmitHandler<CreateEmailSubscriptionDto> = data => mutate(data);

  if (success)
    return (
      <p className="min-h-[44px]">
        <FormattedMessage {...messages.successMessage} />
      </p>
    );

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      globalError={errors.global}
      submitButtonText={intl.formatMessage(messages.submitButton)}
    >
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
              defaultChecked={false}
            />
            <ErrorMessage />
          </InputContainer>
        </Row>
      </Field>
    </Form>
  );
};

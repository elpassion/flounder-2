import React, { useState } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Checkbox, Input } from '@pankod/refine-antd';
import { useForm, Controller } from 'react-hook-form';
import { CreateEmailSubscriptionDto, isConflictResponseError } from '@flounder/contracts';
import { useApi } from '../../../Api';

export const NewsletterForm = (): JSX.Element => {
  const { signUpToNewsletter } = useApi();

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors },
  } = useForm<CreateEmailSubscriptionDto & { global: string }>({
    resolver: classValidatorResolver(CreateEmailSubscriptionDto),
  });

  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: CreateEmailSubscriptionDto) => {
    try {
      await signUpToNewsletter(data);
      reset();
      setSuccess(true);
    } catch (err) {
      if (isConflictResponseError(err)) {
        setError('email', { message: 'Email already taken' });
      } else {
        setError('global', {
          message: 'Oops. We cannot handle your request right now. Try again later',
        });
      }
    }
  };
  if (success) return <p>Thank you for signing up!</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Subscribe to newsletter</h1>
      <Controller
        name="email"
        control={control}
        render={({ field }) => <Input {...field} placeholder="E-mail" />}
      />
      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      <Controller
        name="agreedToTerms"
        control={control}
        render={({ field }) => (
          <Checkbox id={'accept-terms'} {...field}>
            Accept terms
          </Checkbox>
        )}
      />
      {errors.agreedToTerms && <p style={{ color: 'red' }}>{errors.agreedToTerms.message}</p>}
      <div>
        <Button htmlType={'submit'}>Subscribe</Button>
        {errors.global && <p style={{ color: 'red' }}>{errors.global.message}</p>}
      </div>
    </form>
  );
};

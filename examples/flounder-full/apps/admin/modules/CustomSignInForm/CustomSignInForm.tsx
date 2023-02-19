import React from 'react';
import { useRouter } from 'next/router';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSignIn, getCognitoErrorText } from '@flounder/cognito-auth';
import { SignInDto } from '@flounder/contracts';
import { Column, InputContainer } from '@flounder/ui';
import { Form, Input } from '../Forms';

export const CustomSignInForm = () => {
  const { signIn } = useSignIn();
  const router = useRouter();

  const methods = useForm<SignInDto & { global: string }>({
    resolver: classValidatorResolver(SignInDto),
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

  const handleSignIn = async (data: SignInDto) => {
    try {
      const credentials = { mail: data.mail, password: data.password };

      await signIn(credentials);
      await router.push('/');
    } catch (error) {
      const errorText = getCognitoErrorText(error, error?.options);
      setError('global', {
        message: errorText,
      });
    }
  };

  const onSubmit: SubmitHandler<SignInDto> = async data => {
    await handleSignIn(data);
  };

  return (
    <div className="py-10 px-6 rounded-[10px] bg-white">
      <Form.Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        globalError={errors.global}
        submitButtonText={'Sign In'}
        submitButtonFullWidth
      >
        <Form.Field name="mail">
          <Column>
            <Form.Label>E-mail</Form.Label>
            <InputContainer>
              <Input.TextInputField />
              <Form.ErrorMessage />
            </InputContainer>
          </Column>
        </Form.Field>
        <Form.Field name="password">
          <Column>
            <Form.Label>Password</Form.Label>
            <InputContainer>
              <Input.PasswordInputField />
              <Form.ErrorMessage />
            </InputContainer>
          </Column>
        </Form.Field>
      </Form.Form>
    </div>
  );
};

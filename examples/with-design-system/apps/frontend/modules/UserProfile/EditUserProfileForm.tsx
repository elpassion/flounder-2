import { nestJsZodResolver } from 'nestjs-zod-hookform-resolver';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import { TUpdateUser, updateUserSchema } from '@flounder/contracts';
import { Label as Labelled } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { Field, Form, Label } from 'modules/Form';
import { S3FileInput, TextInputField } from 'modules/Inputs';
import { useUserProfile } from './hooks';
import { Row } from './Row';

interface IUserProfileFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const EditUserProfileForm = ({ setIsOpen }: IUserProfileFormProps) => {
  const { currentUser, setCurrentAuthenticatedUser } = useAuth();
  const intl = useIntl();

  if (!currentUser) return null;

  const methods = useForm<TUpdateUser & { global: string }>({
    resolver: nestJsZodResolver(updateUserSchema),
    defaultValues: {
      email: currentUser.email,
      first_name: currentUser.first_name || '',
      last_name: currentUser.last_name || '',
      avatar_key: '',
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const { useUserProfileMutationQuery } = useUserProfile();
  const { mutate } = useUserProfileMutationQuery({
    onSuccess: () => {
      setIsOpen(false);
      void setCurrentAuthenticatedUser();
    },
    onError: () => {
      setError('global', {
        message: 'Oops. We cannot handle your request right now. Try again later',
      });
    },
  });

  const onSubmit = (data: TUpdateUser) => {
    const { avatar_key, ...rest } = data;

    mutate({
      userId: currentUser.cognito_id,
      data: { ...rest, ...(avatar_key && { avatar_key }) },
    });
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)} globalError={errors.global}>
      <Field name="avatar_key">
        <S3FileInput defaultPreview={currentUser.avatar_url} />
      </Field>
      <Field name="email">
        <Row>
          <Label>
            <FormattedMessage {...common.email} />
          </Label>
          <p>{currentUser.email}</p>
        </Row>
      </Field>
      <Field name="first_name">
        <Row>
          <Label>
            <FormattedMessage {...common.firstName} />
          </Label>
          <TextInputField />
        </Row>
      </Field>
      <Field name="last_name">
        <Row>
          <Label>
            <FormattedMessage {...common.lastName} />
          </Label>
          <TextInputField />
        </Row>
      </Field>
      {/*todo: rewrite with Field and Label after handling address by backend  */}
      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
        <Labelled htmlFor="react-select-location-input">
          <FormattedMessage {...common.address} />
        </Labelled>
      </div>
    </Form>
  );
};

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import { UpdateUserDto } from '@flounder/contracts';
import { common } from 'lang/messages/common';
import { Field, Form, Label } from 'modules/Form';
import { S3FileInput, TextInputField } from 'modules/Inputs';
import { useUserProfile } from './hooks';
import { Row } from './Row';
import { messages } from './messages';

interface UserProfileFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const EditUserProfileForm = ({ setIsOpen }: UserProfileFormProps) => {
  const { currentUser, setCurrentAuthenticatedUser } = useAuth();
  const intl = useIntl();

  if (!currentUser) return null;

  const methods = useForm<UpdateUserDto & { global: string }>({
    resolver: classValidatorResolver(UpdateUserDto),
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

  const onSubmit = (data: UpdateUserDto) => {
    const { avatar_key, ...rest } = data;

    mutate({
      userId: currentUser.cognito_id,
      data: { ...rest, ...(avatar_key && { avatar_key }) },
    });
  };

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      globalError={errors.global}
      submitButtonText={intl.formatMessage(messages.submitButton)}
    >
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
    </Form>
  );
};

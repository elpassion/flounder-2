import React, { useState, FC } from 'react';
import { useNotification } from '@pankod/refine-core';
import { ExtendedUserDto } from '@flounder/contracts';
import { WysiwygEditor } from '@flounder/ui';
import { useApi } from '../../../../Api';

interface UserDescriptionProps {
  data: ExtendedUserDto;
  onUpdate: () => void;
}

export const UserDescription: FC<UserDescriptionProps> = props => {
  const { data, onUpdate } = props;
  const { cognito_id, description } = data;
  const { updateUserDescription } = useApi();
  const notification = useNotification();
  const [value, setValue] = useState<string>(description || '');

  const saveDescription = async () => {
    try {
      await updateUserDescription(cognito_id, value).then(onUpdate);
      notification.open({
        type: 'success',
        message: 'Description updated',
      });
    } catch (error) {
      notification.open({
        type: 'error',
        description: 'Something went wrong with updating description',
        message: error.message,
      });
    }
  };

  return <WysiwygEditor value={value} onChange={setValue} onBlur={saveDescription} />;
};

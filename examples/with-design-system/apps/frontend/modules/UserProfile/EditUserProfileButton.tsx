import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@flounder/ui';
import { messages } from './messages';

interface EditUserProfileButtonProps {
  openModal: () => void;
}

export const EditUserProfileButton: FC<EditUserProfileButtonProps> = ({ openModal }) => {
  const intl = useIntl();

  return (
    <Button variant="secondary" onClick={openModal}>
      {intl.formatMessage(messages.editUserButton)}
    </Button>
  );
};

import React, { FC } from 'react';
import { Button, Space } from '@pankod/refine-antd';
import { useNotification } from '@pankod/refine-core';
import { ExtendedUserDto } from '@flounder/contracts';
import { useApi } from '../../../../Api';

interface UserActionsProps {
  data: ExtendedUserDto;
  enabled: boolean;
  refetchData: () => void;
}

export const UserActions: FC<UserActionsProps> = ({ data, enabled, refetchData }) => {
  const { blockUser, unblockUser } = useApi();
  const notification = useNotification();
  const blockUserHandler = async () => {
    try {
      await blockUser(data.cognito_id);
      refetchData();
      notification.open({
        type: 'success',
        message: `${data.email} blocked`,
      });
    } catch (error) {
      notification.open({
        type: 'error',
        description: 'Something went wrong with blocking user',
        message: error.message,
      });
    }
  };
  const unblockUserHandler = async () => {
    try {
      await unblockUser(data.cognito_id);
      refetchData();
      notification.open({
        type: 'success',
        message: `${data.email} unblocked`,
      });
    } catch (error) {
      notification.open({
        type: 'error',
        description: 'Something went wrong with unblocking user',
        message: error.message,
      });
    }
  };
  const onBlockUnblockClick = () => {
    if (enabled) {
      blockUserHandler();
    } else {
      unblockUserHandler();
    }
  };
  return (
    <Space wrap size={10}>
      <Button danger={enabled} onClick={onBlockUnblockClick}>
        {enabled ? 'Block' : 'Unblock'}
      </Button>
    </Space>
  );
};

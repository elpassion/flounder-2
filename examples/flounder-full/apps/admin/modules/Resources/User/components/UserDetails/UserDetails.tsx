import React, { FC } from 'react';
import { Spin, Tabs, Alert } from '@pankod/refine-antd';
import { useCustom } from '@pankod/refine-core';
import { ExtendedUserDto, GetCognitoUserDto } from '@flounder/contracts';
import { AboutUser } from './AboutUser';
import { UserActions } from './UserActions';
import { UserDescription } from './UserDescription';
import { UserGroups } from './UserGroups';

interface UserDetailsProps {
  user: ExtendedUserDto;
  onUpdate: () => void;
}

export const UserDetails: FC<UserDetailsProps> = ({ user, onUpdate }) => {
  const {
    data,
    isLoading,
    refetch: refetchUser,
    isError,
    error,
  } = useCustom<GetCognitoUserDto>({
    url: `/api/admin/users/cognito/${user.cognito_id}`,
    method: 'get',
  });

  const onAboutUserUpdate = () => {
    refetchUser();
    onUpdate();
  };

  if (isError) {
    return (
      <Alert
        type={'error'}
        message={'Something went wrong with fetching user details'}
        description={error.message}
        showIcon
      />
    );
  }

  if (isLoading) {
    return (
      <>
        <Spin />
      </>
    );
  }

  const { enabled } = data.data;

  return (
    <>
      <Tabs defaultActiveKey="about">
        <Tabs.TabPane tab="About" key="about">
          <AboutUser data={data.data} userBasicData={user} onUpdate={onAboutUserUpdate} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Actions" key="actions">
          <UserActions data={user} enabled={enabled} refetchData={refetchUser} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Groups" key="groups">
          <UserGroups data={data.data} refetchData={refetchUser} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Description" key="description">
          <UserDescription data={user} onUpdate={onAboutUserUpdate} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

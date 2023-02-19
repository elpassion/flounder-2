import React, { FC } from 'react';
import { Select, Space } from '@pankod/refine-antd';
import { GetListResponse, useNotification, useSelect } from '@pankod/refine-core';
import { GetCognitoUserDto } from '@flounder/contracts';
import { useApi } from '../../../../Api';

const { Option } = Select;

interface UserGroupsProps {
  data: GetCognitoUserDto;
  refetchData: () => void;
}

export const UserGroups: FC<UserGroupsProps> = ({ data, refetchData }) => {
  const notification = useNotification();
  const { addToGroup, removeFromGroup } = useApi();

  const { options } = useSelect({
    resource: 'admin/groups',
    optionLabel: 'name',
    optionValue: 'name',
    queryOptions: {
      select: groups => transformGroupsOptions(groups),
    },
  });

  const addUserToGroup = async (groupName: string) => {
    try {
      await addToGroup(data.id, groupName);
      refetchData();
      notification.open({
        type: 'success',
        message: `${data.attributes.email} added to ${groupName}`,
      });
    } catch (error) {
      notification.open({
        type: 'error',
        description: 'Something went wrong with adding user to group',
        message: error.message,
      });
    }
  };
  const removeUserFromGroup = async (groupName: string) => {
    try {
      await removeFromGroup(data.id, groupName);
      refetchData();
      notification.open({
        type: 'success',
        message: `${data.attributes.email} removed from ${groupName}`,
      });
    } catch (error) {
      notification.open({
        type: 'error',
        description: 'Something went wrong with removing user from group',
        message: error.message,
      });
    }
  };

  return (
    <Space wrap size={10}>
      <Select
        mode="multiple"
        style={{ width: '100%', minWidth: '200px' }}
        placeholder="Select groups..."
        value={data.groups}
        onDeselect={removeUserFromGroup}
        onSelect={addUserToGroup}
      >
        {options && options.map(option => <Option key={option.value}>{option.label}</Option>)}
      </Select>
    </Space>
  );
};

function transformGroupsOptions(groupsResponse: GetListResponse) {
  return {
    ...groupsResponse,
    data: groupsResponse.data.map(group => ({ name: group })),
  };
}

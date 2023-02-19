import React, { useState, FC, ReactNode } from 'react';
import Image from 'next/image';
import {
  List,
  Modal,
  Table,
  useModal,
  Space,
  useTable,
  Form,
  Input,
  Avatar,
  ShowButton,
  EditButton,
} from '@pankod/refine-antd';
import { ExtendedUserDto } from '@flounder/contracts';
import { UserDetails, FilterForm } from './components';

export const UserList: FC = () => {
  const { show: showModal, modalProps } = useModal();
  const [selectedUser, setSelectedUser] = useState<ExtendedUserDto | undefined>();

  const { tableProps, searchFormProps, tableQueryResult } = useTable<ExtendedUserDto>({
    onSearch: (params: any) => [
      {
        field: 'search',
        operator: 'eq',
        value: params.search,
      },
    ],
  });

  const { refetch: refetchUserList } = tableQueryResult;

  return (
    <List title="Users">
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <FilterForm formProps={searchFormProps}>
          <Form.Item name="search">
            <Input placeholder="Search users..." allowClear />
          </Form.Item>
        </FilterForm>

        <Table {...tableProps} rowKey="cognito_id">
          <Table.Column
            dataIndex="avatar_url"
            render={url => {
              return url ? (
                <Avatar
                  size="large"
                  src={
                    <Image src={url} fill style={{ objectFit: 'contain' }} sizes="100%" alt="" />
                  }
                />
              ) : null;
            }}
          />
          <Table.Column dataIndex="cognito_id" title="ID" sorter />
          <Table.Column dataIndex="first_name" title="First Name" sorter />
          <Table.Column dataIndex="last_name" title="Last Name" sorter />
          <Table.Column dataIndex="email" title="Email" sorter />
          <Table.Column dataIndex="description" title="Description" sorter />
          <Table.Column<ExtendedUserDto>
            title="Actions"
            dataIndex="actions"
            render={(_text, record): ReactNode => (
              <Space>
                <ShowButton
                  size="small"
                  recordItemId={record.cognito_id}
                  onClick={() => {
                    setSelectedUser(record);
                    showModal();
                  }}
                  hideText
                />
                <EditButton size="small" recordItemId={record.cognito_id} hideText />
              </Space>
            )}
          />
        </Table>
      </Space>

      {modalProps.visible && selectedUser && (
        <Modal
          {...modalProps}
          onCancel={() => setSelectedUser(undefined)}
          title={selectedUser.email}
          centered={false}
          cancelText={'Close'}
          okButtonProps={{
            style: {
              display: 'none',
            },
          }}
          width={'600px'}
        >
          <UserDetails user={selectedUser} onUpdate={refetchUserList} />
        </Modal>
      )}
    </List>
  );
};

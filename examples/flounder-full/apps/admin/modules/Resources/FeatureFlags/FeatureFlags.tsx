import React, { FC } from 'react';
import { List, Table, useTable } from '@pankod/refine-antd';
import { FeatureFlagDto } from '@flounder/contracts';
import { FeatureFlagSwitch } from './SwitchFeatureFlagColimn';

export const FeatureFlags: FC = () => {
  const { ...tableProps } = useTable<FeatureFlagDto>({
    resource: 'admin/feature-flags',
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <List>
      <Table {...tableProps.tableProps} rowKey="name">
        <Table.Column
          dataIndex="name"
          title="Feature"
          render={(value: string) => <span>{value}</span>}
          sorter
        />
        <Table.Column
          dataIndex="isActive"
          title="On/Off"
          render={(value: boolean, record: FeatureFlagDto) => (
            <FeatureFlagSwitch name={record.name} isActive={value} />
          )}
        />
      </Table>
    </List>
  );
};

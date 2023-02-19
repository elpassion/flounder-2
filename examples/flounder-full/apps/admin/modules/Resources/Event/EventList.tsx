import { FC } from 'react';
import { useTable, List, Table, DateField, Button, Icons } from '@pankod/refine-antd';

export const EventList: FC = () => {
  const { tableProps } = useTable<Event>({
    resource: 'events',
    initialPageSize: 10,
  });
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <List title="Events">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" sorter />
        <Table.Column
          dataIndex="created_at"
          title="Date created"
          render={value => <DateField value={value} format="LLL" />}
          sorter
        />
        <Table.Column dataIndex="type" title="Type" sorter />
        <Table.Column
          dataIndex="details"
          key="details"
          title="Email"
          render={value => <span>{value.email}</span>}
        />
        <Table.Column<Event>
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(value, ...rest) => (
            <Button onClick={() => console.log(value, rest)}>
              Resend <Icons.SendOutlined />
            </Button>
          )}
        />
      </Table>
    </List>
  );
};

/** TODO: Implement shared class */
interface Event {
  id: string;
  created_at: string;
  type: string;
  details: { email: string };
}

export default EventList;

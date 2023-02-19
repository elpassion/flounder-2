import React from 'react';
import type { NextPage } from 'next';
import { UsersList, useUsers } from '../../User';

export const Users: NextPage = () => {
  const { useUsersQuery } = useUsers();
  const { data: page } = useUsersQuery();
  return (
    <>
      <div className="px-5 pt-3">
        <UsersList users={page?.data || []} />
      </div>
    </>
  );
};

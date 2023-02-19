import { FormattedMessage } from 'react-intl';
import { ExtendedUserDto } from '@flounder/contracts';
import { Avatar } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { messages } from './messages';

export interface UsersProps {
  users: ExtendedUserDto[];
}

export const UsersList = ({ users }: UsersProps) => {
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-gray-900 sm:flex sm:items-center sm:flex-auto">
          <FormattedMessage {...messages.header} />
        </h1>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      />

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <FormattedMessage {...common.email} />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {users.map((user, userIdx) => (
                      <tr key={userIdx} className={userIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.avatar_url ? <Avatar size="small" src={user.avatar_url} /> : null}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {user.cognito_id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

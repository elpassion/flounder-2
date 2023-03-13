import Link from 'next/link';
import { TExtendedUser } from '@flounder/contracts';
import { Avatar } from '@flounder/ui';
import { routes } from 'utils/routes';

export const UserMenu = ({ currentUser }: { currentUser: TExtendedUser }) => {
  const { avatar_url, first_name, email } = currentUser;

  return (
    <Link href={routes.userProfile}>
      <div className="flex flex-shrink-0 w-full group items-center cursor-pointer">
        <div>
          <Avatar size="small" src={avatar_url || ''} />
        </div>
        <div className="ml-3">
          <p className="text-xs font-bold text-blue-200 group-hover:text-blue-400 whitespace-normal">
            {first_name || email}
          </p>
        </div>
      </div>
    </Link>
  );
};

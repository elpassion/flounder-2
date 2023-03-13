import { useAuth } from '@flounder/cognito-auth';
import { AppNavigation } from './AppNavigation';
import { AppLogo as SideBarHeader } from './SideBarHeader';
import { UserMenu } from './UserMenu';

export function SideBar() {
  const { currentUser } = useAuth();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
      <SideBarHeader src="/fish.ico" alt="flounder logo" appName="FLOUNDER" />
      <div className="mt-5 flex-1 h-0 overflow-y-auto">
        <AppNavigation />
      </div>
      {currentUser && (
        <div className="flex-shrink-0 flex bg-gray-700 p-4">
          <UserMenu currentUser={currentUser} />
        </div>
      )}
    </div>
  );
}

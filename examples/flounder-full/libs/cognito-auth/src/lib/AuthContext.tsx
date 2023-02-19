import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Hub } from 'aws-amplify';
import { AuthProviderProps, IAuthContext } from './Auth.interface';
import { ExtendedUserDto } from '@flounder/contracts';
import { UserApi } from '@flounder/shared-apis';

export const AuthContext = createContext<IAuthContext>({
  cognitoApi: undefined,
  currentUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentAuthenticatedUser: async () => {},
});

export const AuthProvider = ({
  cognitoApi,
  ssrUser,
  children,
}: PropsWithChildren<AuthProviderProps>) => {
  const [currentUser, setUser] = useState<ExtendedUserDto | null>(ssrUser);

  const setCurrentAuthenticatedUser = useCallback(async () => {
    const user = await new UserApi().getCurrentUser();
    setUser(user);
  }, []);

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signIn':
          void setCurrentAuthenticatedUser();
          break;
        case 'signOut':
          setUser(null);
      }
    });
  }, [setCurrentAuthenticatedUser]);

  return (
    <AuthContext.Provider
      value={{
        cognitoApi,
        currentUser: currentUser || ssrUser,
        setCurrentAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

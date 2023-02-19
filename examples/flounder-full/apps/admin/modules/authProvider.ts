import { AuthProvider } from '@pankod/refine-core';
import { useAuth } from '@flounder/cognito-auth';

export const useAdminAuthProvider = (): AuthProvider => {
  const { cognitoApi } = useAuth();

  return {
    login: () => Promise.resolve(),
    logout: async () => {
      try {
        await cognitoApi.signOut();
        localStorage.clear();
      } catch {
        return console.error('Sth goes wrong during logout');
      }
    },
    checkError: error => {
      if (error && error.response && error.response.status === 401) {
        return Promise.reject();
      }

      return Promise.resolve();
    },
    checkAuth: () => {
      return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
    // https://github.com/refinedev/refine/pull/2291
    // with empty function return undefined and warning
    // getUserIdentity: () => Promise.resolve(),
  };
};

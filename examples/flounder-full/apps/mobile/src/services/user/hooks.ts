import { UserService } from './UserService';
import { useAppDispatch } from '../../store/store';

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const userService = new UserService();

  const getUserAfterLogin = () => {
    dispatch(userService.signIn());
  };

  const getCurrentUser = () => {
    dispatch(userService.getCurrentUser());
  };

  return { getUserAfterLogin, getCurrentUser };
};

import { useAppDispatch } from '../../store/store';
import { AuthService } from './AuthService';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const authService = new AuthService();

  const authorizeUser = () => {
    dispatch(authService.authorizeUser());
  };

  const logoutUser = () => {
    dispatch(authService.logoutUser());
  };

  return { authorizeUser, logoutUser };
};

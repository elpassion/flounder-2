import { UserApi } from './index';
import { AppDispatch } from '../../store/store';
import {
  getUserFulfilled,
  getUserPending,
  getUserRejected,
} from '../../reducers/user.reducer';

export class UserService {
  private userApi: UserApi = null;

  constructor() {
    this.userApi = new UserApi();
  }

  signIn(): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(getUserPending());
        const userResponse = await this.userApi.signInUser();
        dispatch(getUserFulfilled(userResponse));
      } catch (e: unknown) {
        dispatch(getUserRejected());
      }
    };
  }

  getCurrentUser(): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(getUserPending());
        const userResponse = await this.userApi.getCurrentUser();
        dispatch(getUserFulfilled(userResponse));
      } catch (e: unknown) {
        dispatch(getUserRejected());
      }
    };
  }
}

import { store } from '../src/store/store';
import {
  clearAuthenticatedUser,
  getUserFulfilled,
} from '../src/reducers/user.reducer';
import { exampleUser } from '@flounder/contracts';

const prefillAppStateWithMockedUser = () => {
  store.dispatch(getUserFulfilled(exampleUser));
};

const removeMockedUserFromAppState = () => {
  store.dispatch(clearAuthenticatedUser());
};

const getUserFromAppState = () => {
  const state = store.getState().user;

  return state.user;
};

export const UserStateUtils = {
  prefillAppStateWithMockedUser,
  removeMockedUserFromAppState,
  getUserFromAppState,
};

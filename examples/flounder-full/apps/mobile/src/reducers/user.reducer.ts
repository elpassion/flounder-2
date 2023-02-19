import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetUserDto } from '@flounder/contracts';

interface UserReducer {
  user: GetUserDto;
  isFetching: boolean;
}

const initialState: UserReducer = {
  user: null,
  isFetching: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserPending(state: UserReducer) {
      state.isFetching = true;
    },
    getUserFulfilled(state: UserReducer, action: PayloadAction<GetUserDto>) {
      state.user = action.payload;
      state.isFetching = false;
    },
    getUserRejected(state: UserReducer) {
      state.isFetching = false;
    },
    clearAuthenticatedUser(state: UserReducer) {
      state.user = null;
      state.isFetching = false;
    },
  },
});

export const {
  getUserPending,
  getUserFulfilled,
  getUserRejected,
  clearAuthenticatedUser,
} = userSlice.actions;

export default userSlice.reducer;

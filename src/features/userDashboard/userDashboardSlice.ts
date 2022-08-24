import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { authActions } from '../auth/authSlice';
import { UserDTO } from '../user/dtos/UserDTO';
import { fetchUserDashboard } from './userDashboardAPI';

export interface UserDashboardState {
  status: 'idle' | 'loading' | 'succeed' | 'failed';
  users: UserDTO[];
  userCounts: number;
  avgOfActvieUserInSevenDay: number;
  numOfActiveUserToday: number;
}

const initialState: UserDashboardState = {
  status: 'idle',
  users: [],
  userCounts: 0,
  avgOfActvieUserInSevenDay: 0,
  numOfActiveUserToday: 0,
};

export const getUserDashboardAsyncAction = createAsyncThunk(
  'users/fetchUserDashboard',
  async (_, thunkAPI) => {
    try {
      const response = await fetchUserDashboard();
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 401) thunkAPI.dispatch(authActions.unAuth());
        throw result;
      }
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userDashboardSlice = createSlice({
  name: 'userDashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDashboardAsyncAction.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(getUserDashboardAsyncAction.fulfilled, (state, action) => {
        const { items, meta } = action.payload;
        const data: UserDTO[] = [...items];
        const { userCounts, avgOfActvieUserInSevenDay, numOfActiveUserToday } =
          meta;
        return {
          ...state,
          status: 'succeed',
          users: data,
          userCounts,
          avgOfActvieUserInSevenDay,
          numOfActiveUserToday,
        };
      })
      .addCase(getUserDashboardAsyncAction.rejected, (state) => {
        return {
          ...state,
          status: 'failed',
        };
      });
  },
});

export const userDashboardActions = userDashboardSlice.actions;
export const selectUserDashboard = (state: RootState) => state.userDashboard;
export default userDashboardSlice.reducer;

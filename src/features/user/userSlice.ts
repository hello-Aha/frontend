import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from '../../app/cookies';
import { RootState } from '../../app/store';
import { authActions } from '../auth/authSlice';
import { fetchUser, fetchUserDashboard } from './userAPI';

export interface User {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  account: string;
  isActive: boolean;
}

export interface UserState {
  user: User;
  status: 'idle' | 'loading' | 'failed';
  users: User[];
}

const initialState: UserState = {
  status: 'idle',
  user: {
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    account: '',
    isActive: false,
  },
  users: [],
};

export const getUserAsync = createAsyncThunk(
  'users/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await fetchUser();
      const data = await response.json();
      if (!response.ok) throw data;
      return data;
    } catch (error) {
      thunkAPI.dispatch(authActions.unAuth());
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const getUserDashBoardAsync = createAsyncThunk(
  'users/fetchUserDashboard',
  async (_, thunkAPI) => {
    try {
      const response = await fetchUserDashboard();
      const data = await response.json();
      if (!response.ok) throw data;
      return data;
    } catch (error) {
      thunkAPI.dispatch(authActions.unAuth());
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        const data: User = { ...action.payload };
        return {
          ...state,
          status: 'idle',
          user: data,
        };
      })
      .addCase(getUserAsync.rejected, (state) => {
        return {
          ...state,
          status: 'failed',
        };
      })

      .addCase(getUserDashBoardAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(getUserDashBoardAsync.fulfilled, (state, action) => {
        const data: User[] = [...action.payload];
        return {
          ...state,
          status: 'idle',
          users: data,
        };
      })
      .addCase(getUserDashBoardAsync.rejected, (state) => {
        return {
          ...state,
          status: 'failed',
        };
      });
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;

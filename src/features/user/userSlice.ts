import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { authActions } from '../auth/authSlice';
import { ResetPasswordDTO } from './dtos/ResetPasswordDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { UserDTO } from './dtos/UserDTO';
import {
  fetchUser,
  fetchUserDashboard,
  resetPassword,
  updateUser,
} from './userAPI';

export interface UserState {
  user: UserDTO;
  status: 'idle' | 'loading' | 'succeed' | 'failed';
}

const initialState: UserState = {
  status: 'idle',
  user: {
    id: '',
    displayName: '',
    email: '',
    googleUserId: null,
    facebookUserId: null,
    signInCount: 0,
    isActive: false,
    lastSessionAt: '',
    createdAt: '',
  },
};

export const getUserAsync = createAsyncThunk(
  'users/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await fetchUser();
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) thunkAPI.dispatch(authActions.unAuth());
        throw data;
      }
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPasswordAsyncAction = createAsyncThunk(
  'users/resetPassword',
  async (data: ResetPasswordDTO, thunkAPI) => {
    const response = await resetPassword(data);
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result;
  }
);

export const updateUserAsyncAction = createAsyncThunk(
  'users/updateUser',
  async (data: UpdateUserDTO, thunkAPI) => {
    try {
      const response = await updateUser(data);
      const result = await response.json();
      if (result.statusCode !== 200) {
        if (response.status === 401) thunkAPI.dispatch(authActions.unAuth());
        throw result;
      }
      return result.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
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
        user: { ...state.user, ...action.payload },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsyncAction.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(updateUserAsyncAction.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeed',
          user: {
            ...state.user,
            ...action.payload,
          },
        };
      })
      .addCase(updateUserAsyncAction.rejected, (state) => {
        return {
          ...state,
          status: 'failed',
        };
      })
      .addCase(getUserAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        const data: UserDTO = { ...action.payload };
        return {
          ...state,
          status: 'succeed',
          user: data,
        };
      })
      .addCase(getUserAsync.rejected, (state) => {
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

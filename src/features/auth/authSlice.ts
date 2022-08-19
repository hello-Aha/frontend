import Cookies from 'universal-cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { userActions } from '../user/userSlice';
import { authenticate, login } from './authAPI';
import { AuthInfoDTO } from './AuthInfo.dto';

export interface AuthState {
  isAuth: boolean;
  status: 'idle' | 'loading' | 'successed' | 'failed';
}
const initialState: AuthState = {
  isAuth: false,
  status: 'idle',
};
const cookies = new Cookies();

export const authenticateAsyncAction = createAsyncThunk(
  'authentication/authenticate',
  async (_data, thunkAPI) => {
    try {
      const response = await authenticate();
      if (!response.ok) throw response.statusText;
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginAsyncAction = createAsyncThunk(
  'authentication/login',
  async (data: AuthInfoDTO, thunkAPI) => {
    try {
      const response = await login(data);
      const result = await response.json();
      if (!response.ok) throw result;
      const {
        email,
        firstName,
        lastName,
        displayName,
        isActive,
        account,
        accessToken,
      } = result.data;
      thunkAPI.dispatch(
        userActions.setUser({
          email,
          firstName,
          lastName,
          displayName,
          isActive,
          account,
        })
      );
      cookies.set('accessToken', accessToken, { path: '/' });
      return result;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    auth: (state) => {
      return {
        ...state,
        isAuth: true,
      };
    },
    unAuth: (state) => {
      cookies.remove('accessToken', { path: '/' });
      return {
        ...state,
        isAuth: false,
        status: 'failed',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateAsyncAction.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(authenticateAsyncAction.fulfilled, (state) => {
        return {
          ...state,
          status: 'idle',
          isAuth: true,
        };
      })
      .addCase(authenticateAsyncAction.rejected, (state) => {
        return {
          ...state,
          status: 'failed',
          isAuth: false,
        };
      })
      .addCase(loginAsyncAction.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(loginAsyncAction.fulfilled, (state) => {
        return {
          ...state,
          status: 'idle',
          isAuth: true,
        };
      })
      .addCase(loginAsyncAction.rejected, (state) => {
        return {
          ...state,
          status: 'failed',
          isAuth: false,
        };
      });
  },
});

export const authActions = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;

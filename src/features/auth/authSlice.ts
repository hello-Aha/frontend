import Cookies from 'universal-cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { userActions } from '../user/userSlice';
import { authenticate, googleAuthenticate, login } from './authAPI';
import { AuthInfoDTO } from './AuthInfo.dto';

export interface AuthState {
  isAuth: boolean;
  status: 'idle' | 'loading' | 'succeed' | 'failed';
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
      const { email, displayName, isActive, accessToken } = result.data;
      thunkAPI.dispatch(
        userActions.setUser({
          email,
          displayName,
          isActive,
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

export const loginWithGoogleAsyncAction = createAsyncThunk(
  'authentication/google',
  async (data: any, thunkAPI) => {
    try {
      const response = await googleAuthenticate(data);
      const result = await response.json();
      if (!response.ok) throw result;
      const { accessToken, user } = result.data;

      if (accessToken === null) {
        console.log(user);
        thunkAPI.dispatch(
          userActions.setUser({
            googleUserId: user.google_user_id,
            email: user.email,
            displayName: user.display_name,
            isActive: true,
          })
        );
        return result.data;
      }
      cookies.set('accessToken', accessToken, { path: '/' });

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const loginWithFacebookAsyncAction = createAsyncThunk(
//   'authentication/facebook',
//   async (data: any, thunkAPI) => {
//     const response = await googleAuthenticate(data);
//     console.log(response);
//     const result = await response.json();
//     console.log(result);
//   }
// )

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
      .addCase(loginWithGoogleAsyncAction.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(loginWithGoogleAsyncAction.fulfilled, (state, action) => {
        if (action.payload.accessToken === null) {
          return {
            status: 'idle',
            isAuth: false,
          };
        }
        return {
          ...state,
          status: 'succeed',
          isAuth: true,
        };
      })
      .addCase(loginWithGoogleAsyncAction.rejected, (state) => {
        return {
          ...state,
          status: 'failed',
          isAuth: false,
        };
      })
      .addCase(authenticateAsyncAction.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(authenticateAsyncAction.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeed',
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
          status: 'succeed',
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

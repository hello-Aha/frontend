import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { userActions } from '../user/userSlice';
import {
  authenticate,
  facebookAuthenticate,
  googleAuthenticate,
  login,
} from './authAPI';
import { AuthInfoDTO } from './AuthInfo.dto';
import { OauthDTO } from './dtos/OauthDTO';
import cookies from '../../app/cookies';

const { REACT_APP_SERVER_SIDE_DOMAIN } = process.env;

export interface AuthState {
  isAuth: boolean;
  status: 'idle' | 'loading' | 'succeed' | 'failed';
}
const initialState: AuthState = {
  isAuth: false,
  status: 'idle',
};

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
      cookies.set('accessToken', accessToken, {
        path: '/',
        domain: REACT_APP_SERVER_SIDE_DOMAIN,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginWithGoogleAsyncAction = createAsyncThunk(
  'authentication/google',
  async (data: OauthDTO, thunkAPI) => {
    try {
      const response = await googleAuthenticate(data);
      const result = await response.json();
      if (!response.ok) throw result;
      const { accessToken, user } = result.data;

      if (accessToken === null) {
        const { googleUserId, displayName, email } = user;
        thunkAPI.dispatch(
          userActions.setUser({
            googleUserId,
            email,
            displayName,
            isActive: true,
          })
        );
        return result.data;
      }
      cookies.set('accessToken', accessToken, {
        path: '/',
        domain: REACT_APP_SERVER_SIDE_DOMAIN,
      });

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginWithFacebookAsyncAction = createAsyncThunk(
  'authentication/facebook',
  async (data: OauthDTO, thunkAPI) => {
    try {
      const response = await facebookAuthenticate(data);
      const result = await response.json();
      if (!response.ok) throw result;
      const { accessToken, user } = result.data;

      if (accessToken === null) {
        const { facebookUserId, displayName, email } = user;
        thunkAPI.dispatch(
          userActions.setUser({
            facebookUserId,
            email,
            displayName,
            isActive: true,
          })
        );
        return result.data;
      }
      cookies.set('accessToken', accessToken, {
        path: '/',
        domain: REACT_APP_SERVER_SIDE_DOMAIN,
      });

      return result.data;
    } catch (error) {
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
      cookies.remove('accessToken', {
        path: '/',
        domain: REACT_APP_SERVER_SIDE_DOMAIN,
      });
      return {
        ...state,
        isAuth: false,
        status: 'failed',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithFacebookAsyncAction.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(loginWithFacebookAsyncAction.fulfilled, (state, action) => {
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
      .addCase(loginWithFacebookAsyncAction.rejected, (state) => {
        return {
          ...state,
          status: 'failed',
          isAuth: false,
        };
      })
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

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import sideBarMenuReducer from '../features/sideMenuBar/sideBarMenuSlice';
import userDashBoardReducer from '../features/userDashboard/userDashboardSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
    sideBar: sideBarMenuReducer,
    userDashboard: userDashBoardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

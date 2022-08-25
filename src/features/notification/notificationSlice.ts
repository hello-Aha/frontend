import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
});

export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SideBar {
  isOpen: boolean;
}

const initialState: SideBar = {
  isOpen: false,
};

export const sideBarMenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    open: (state, action) => {
      return {
        ...state,
        isOpen: action.payload,
      };
    },
  },
});

export const sideMenuBarActions = sideBarMenuSlice.actions;

export const selectSideBarMenu = (state: RootState) => state.sideBar;

export default sideBarMenuSlice.reducer;

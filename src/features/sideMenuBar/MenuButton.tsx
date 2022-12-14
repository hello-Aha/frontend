import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuth } from '../auth/authSlice';
import { selectSideBarMenu, sideMenuBarActions } from './sideBarMenuSlice';

export default function MenuButton() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const sideBarMenuState = useAppSelector(selectSideBarMenu);
  const toggleHandler = () => {
    dispatch(sideMenuBarActions.open(!sideBarMenuState.isOpen));
  };
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ width: 48, mr: 2 }}
      onClick={toggleHandler}
    >
      {authState.isAuth ? <MenuIcon /> : ''}
    </IconButton>
  );
}

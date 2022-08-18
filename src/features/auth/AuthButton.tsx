import React from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authActions, selectAuth } from './authSlice';

export default function AuthButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector(selectAuth);
  const logoutHandler = () => {
    dispatch(authActions.unAuth());
    navigate('/signin', { replace: true });
  };
  if (authState.isAuth) {
    return (
      <Button
        sx={{ width: 94 }}
        color="neutral"
        variant="outlined"
        onClick={logoutHandler}
      >
        LOGOUT
      </Button>
    );
  }
  return (
    <Button
      sx={{ width: 94 }}
      color="neutral"
      variant="outlined"
      component={Link}
      to="signin"
    >
      LOGIN
    </Button>
  );
}

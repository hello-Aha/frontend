import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import cookies from '../../app/cookies';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authActions, selectAuth } from '../auth/authSlice';
import { getUserAsync, selectUser } from './userSlice';

export default function User() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const userState = useAppSelector(selectUser);
  // const authState = useAppSelector(selectAuth);

  // check login status and redirect
  useEffect(() => {
    if (authState.status === 'failed') navigate('/signin', { replace: true });
  }, [dispatch, navigate, authState]);
  console.log(authState);

  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  const { account, email, displayName } = userState.user;
  if (!authState.isAuth) return null;
  return (
    <div>
      <p>{account}</p>
      <p>{email}</p>
      <p>{displayName}</p>
      <Button component={Link} to="/user/resetpassword">
        Reset Password
      </Button>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuth } from '../auth/authSlice';
import { getUserAsync, selectUser, updateUserAsyncAction } from './userSlice';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import Unverified from '../../components/Unverified';

const HorizontalLine = styled.hr`
  background-color: #aea0a0;
  height: 1px;
`;

export default function User() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const userState = useAppSelector(selectUser);
  const [user, setUser] = useState(userState.user);
  // const authState = useAppSelector(selectAuth);

  // check login status and redirect
  useEffect(() => {
    if (authState.status === 'failed' && !authState.isAuth)
      navigate('/signin', { replace: true });
  }, [dispatch, navigate, authState]);

  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  useEffect(() => {
    setUser(userState.user);
  }, [userState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: UpdateUserDTO = {
      displayName: user.displayName,
    };
    dispatch(updateUserAsyncAction(payload));
  };

  if (!authState.isAuth) return null;
  if (!userState.user.isActive)
    return <Unverified email={user.email} displayName={user.displayName} />;
  return (
    <div>
      <h2>User Profile</h2>
      <HorizontalLine />
      <form onSubmit={handleSubmit}>
        <h4>Email</h4>
        <p>{user.email}</p>
        <div>
          <TextField
            label="Display Name"
            value={user.displayName}
            onChange={(e) => {
              setUser({
                ...user,
                displayName: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <Button component={Link} to="/user/resetpassword">
            Reset Password
          </Button>
        </div>
        <div>
          <Button type="submit">Save Profile</Button>
        </div>
      </form>
    </div>
  );
}

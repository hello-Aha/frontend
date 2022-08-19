import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuth } from '../auth/authSlice';
import { getUserDashBoardAsync, selectUser } from './userSlice';

export default function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);
  const authState = useAppSelector(selectAuth);

  // check login status and redirect
  useEffect(() => {
    if (authState.status === 'failed') navigate('/signin', { replace: true });
  }, [dispatch, navigate, authState]);

  useEffect(() => {
    dispatch(getUserDashBoardAsync());
  }, [dispatch]);

  const { users } = userState;
  return (
    <div>
      hello user dashboard
      {users.map((user) => {
        return <div key={user.account}>{user.account}</div>;
      })}
    </div>
  );
}

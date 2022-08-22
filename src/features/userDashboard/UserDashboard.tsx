import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { selectAuth } from '../auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getUserDashboardAsyncAction,
  selectUserDashboard,
} from './userDashboardSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userDashboardState = useAppSelector(selectUserDashboard);
  const authState = useAppSelector(selectAuth);

  // check login status and redirect
  useEffect(() => {
    if (authState.status === 'failed') navigate('/signin', { replace: true });
  }, [dispatch, navigate, authState]);

  useEffect(() => {
    dispatch(getUserDashboardAsyncAction());
  }, [dispatch]);

  const { users, userCounts, avgOfActvieUserInSevenDay, numOfActiveUserToday } =
    userDashboardState;
  return (
    <div>
      User Dashboard
      <Stack direction="row" spacing={2}>
        <Item>{`users count ${userCounts}`}</Item>
        <Item>
          {`average actvie user in seven day ${avgOfActvieUserInSevenDay}`}
        </Item>
        <Item>{`active user today ${numOfActiveUserToday}`}</Item>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">Display Name</TableCell>
              <TableCell align="right">Count Of Login</TableCell>
              <TableCell align="right">Sign Up Time</TableCell>
              <TableCell align="right">Last Session Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell align="right">{user.displayName}</TableCell>
                <TableCell align="right">{user.signInCount}</TableCell>
                <TableCell align="right">{user.createdAt}</TableCell>
                <TableCell align="right">{user.lastSessionAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

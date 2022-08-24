import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../user/userSlice';
import { signUp } from './authAPI';
import { loginAsyncAction } from './authSlice';

export default function SignUp() {
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    setEmail(userState.user.email);
    setDisplayName(userState.user.displayName);
  }, [userState]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...userState.user,
      email,
      displayName,
      password,
    };
    const response = await signUp(payload);
    const data = await response.json();
    if (data.statusCode === 201)
      dispatch(
        loginAsyncAction({
          email,
          password,
        })
      )
        .unwrap()
        .then(() => {
          navigate('/user/profile', { replace: true });
        })
        .catch((error) => {
          throw new Error(error);
        });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            margin="normal"
            required
            id="password"
            label="Email"
            name="email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            margin="normal"
            required
            id="displayName"
            label="Display Name"
            name="displayName"
            value={displayName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDisplayName(event.target.value);
            }}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            margin="normal"
            required
            id="paassword"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

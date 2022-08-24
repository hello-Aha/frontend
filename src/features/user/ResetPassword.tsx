import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { ResetPasswordDTO } from './dtos/ResetPasswordDTO';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetPasswordAsyncAction, selectUser } from './userSlice';

export default function ResetPassword() {
  const usertState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: ResetPasswordDTO = {
      email: usertState.user.email,
      password,
      newPassword,
      repeatNewPassword,
    };
    dispatch(resetPasswordAsyncAction(payload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          margin="normal"
          required
          id="password"
          label="old password"
          type="password"
          name="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          margin="normal"
          required
          id="newPassword"
          label="new password"
          name="newPassword"
          type="password"
          value={newPassword}
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNewPassword(event.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          margin="normal"
          required
          id="repeatNewPassword"
          label="repeat new password"
          name="repeatNewPassword"
          type="password"
          value={repeatNewPassword}
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRepeatNewPassword(event.target.value);
          }}
        />
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

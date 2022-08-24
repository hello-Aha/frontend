import { Button } from '@mui/material';
import React, { useState } from 'react';
import { resendVerifyEmail } from '../features/auth/authAPI';

interface Props {
  email: string;
  displayName: string;
}

export default function Unverified({ email, displayName }: Props) {
  const [disable, setDisable] = useState(false);
  const handleResentEmail = async () => {
    setDisable(true);
    await resendVerifyEmail({ email, displayName });
  };
  return (
    <div>
      <p>
        Your account is not verified yet. Please verify your account by email.
      </p>
      <p>Click resend if you did not receive an email.</p>
      <Button onClick={handleResentEmail} disabled={disable}>
        Resend
      </Button>
    </div>
  );
}

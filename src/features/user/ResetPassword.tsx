import React from 'react';
import { TextField } from '@mui/material';

export default function ResetPassword() {
  return (
    <form>
      <div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
      <div>
        <TextField id="filled-basic" label="Filled" variant="filled" />
      </div>
      <div>
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </div>
    </form>
  );
}

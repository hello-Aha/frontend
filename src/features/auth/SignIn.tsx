import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuth, loginAsyncAction } from './authSlice';
import { AuthInfoDTO } from './AuthInfo.dto';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {` ${new Date().getFullYear()} .`}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const authState = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [authInfo, setAuthInfo] = useState({
    account: '',
    password: '',
  });

  useEffect(() => {
    if (authState.status === 'idle' && authState.isAuth) {
      navigate('/', { replace: true });
    }
  }, [navigate, authState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: AuthInfoDTO = {
      ...authInfo,
    };

    await dispatch(loginAsyncAction(payload));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="Email Address or Account"
              name="account"
              autoComplete="email"
              autoFocus
              value={authInfo.account}
              onChange={(e) =>
                setAuthInfo({ ...authInfo, account: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={authInfo.password}
              onChange={(e) =>
                setAuthInfo({ ...authInfo, password: e.target.value })
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/#" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<FacebookIcon />}
          >
            SIGN IN WITH FACEBOOK
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<GoogleIcon />}
          >
            SIGN IN WITH GOOGLE
          </Button>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

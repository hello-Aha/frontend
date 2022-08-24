import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuth, loginAsyncAction } from './authSlice';
import { AuthInfoDTO } from './AuthInfo.dto';
import GoogleLoginButton from './GoogleLoginButton';
import FacebookLoginButton from './FacebookLoginButton';

const HorizontalLine = styled.div`
  height: 2px;
  width: 100%;
  background: #bfc6de;
`;

const theme = createTheme();

export default function SignIn() {
  const authState = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [authInfo, setAuthInfo] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (authState.status !== 'failed' && authState.isAuth) {
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
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              value={authInfo.email}
              onChange={(e) =>
                setAuthInfo({ ...authInfo, email: e.target.value })
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <HorizontalLine />
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            component={Link}
            to="/signup"
          >
            Don&apos;t have an account? Sign Up
          </Button>
          <FacebookLoginButton />
          <GoogleLoginButton />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

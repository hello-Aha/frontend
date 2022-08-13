import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { authActions, isAuthenticated } from '../features/auth/authSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#fff',
      contrastText: '#fff',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthenticated);
  const logutHandler = () => {
    dispatch(authActions.logout())

  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ width:48, mr:2 }}
            >
            {isAuth? <MenuIcon />:''} 
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Aha
            </Typography>
            
            {!isAuth && <Button sx={{width:94}} color="neutral" variant="outlined" ><Link to="/signin">LOGIN</Link></Button>}
            {isAuth && <Button sx={{width:94}} color="neutral" variant="outlined" onClick={logutHandler} >LOGOUT</Button>}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
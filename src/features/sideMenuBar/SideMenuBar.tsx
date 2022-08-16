
import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectSideMenuBar } from './sideMenuBarSlice';
import { isAuthenticated } from '../auth/authSlice';

export default function SideMenuBar() {
  const sideBarMenuState = useAppSelector(selectSideMenuBar);
  const isAuth = useAppSelector(isAuthenticated);
  if(!isAuth) return(<></>);
  if(!sideBarMenuState.isOpen) return(<></>);
  return (
    <Paper sx={{ width: 320, maxWidth: '100%', maxHeight: '100%', position: 'absolute' }}>
      <MenuList sx={{height: '100vh'}}>
      <MenuItem component={Link} to="/" >
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="user/profile" >
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>User</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="users/dashboard" >
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
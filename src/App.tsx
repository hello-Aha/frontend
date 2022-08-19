import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Counter from './features/counter/Counter';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import SignIn from './features/auth/SignIn';
import ButtonAppBar from './components/ButtonAppBar';
import User from './features/user/User';
import UserDashboard from './features/user/UserDashboard';
import SideBarMenu from './features/sideMenuBar/SideBarMenu';
import ResetPassword from './features/user/ResetPassword';
import { useAppDispatch } from './app/hooks';
import { authenticateAsyncAction } from './features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authenticateAsyncAction());
  }, [dispatch]);
  return (
    <div className="App">
      <ButtonAppBar />
      <SideBarMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="counter" element={<Counter />} />
        <Route path="user/profile" element={<User />} />
        <Route path="users/dashboard" element={<UserDashboard />} />
        <Route path="user/resetPassword" element={<ResetPassword />} />
      </Routes>
      <header className="App-header" />
    </div>
  );
}

export default App;

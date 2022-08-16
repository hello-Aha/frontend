import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import SignIn from './features/auth/SignIn';
import ButtonAppBar from './components/ButtonAppBar';
import { User } from './features/user/User';
import UserDashboard from './features/user/UserDashboard';
import SideMenuBar from './features/sideMenuBar/SideMenuBar';

function App() {
  
  return (
    <div className="App">
      <ButtonAppBar/>
      {}<SideMenuBar/>
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signin" element={<SignIn/>}/>
        <Route path="counter" element={<Counter/>}/>
        <Route path="user/profile" element={<User/>}/>
        <Route path="users/dashboard" element={<UserDashboard/>}/>
      </Routes>
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;

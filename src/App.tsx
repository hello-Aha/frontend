import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import SignIn from './features/auth/SignIn';
import ButtonAppBar from './components/ButtonAppBar';

function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signin" element={<SignIn/>}/>
        <Route path="counter" element={<Counter/>}/>
      </Routes>
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;

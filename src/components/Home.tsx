import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from '../app/cookies';
import { useAppDispatch } from '../app/hooks';
import { authActions } from '../features/auth/authSlice';
import logo from '../logo.svg';

export default function Home() {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //check login status and redirect
  useEffect(() => {
  if(!cookies.get('accessToken')){
    dispatch(authActions.logout())
  }else{
    dispatch(authActions.login())
  }
},[dispatch])

return (
  <>
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.tsx</code> and save to reload.
    </p>
    <span>
      <span>Learn </span>
      <a
        className="App-link"
        href="https://reactjs.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        React
      </a>
      <span>, </span>
      <a
        className="App-link"
        href="https://redux.js.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Redux
      </a>
      <span>, </span>
      <a
        className="App-link"
        href="https://redux-toolkit.js.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Redux Toolkit
      </a>
      ,<span> and </span>
      <a
        className="App-link"
        href="https://react-redux.js.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        React Redux
      </a>
    </span>
  </>
);
}
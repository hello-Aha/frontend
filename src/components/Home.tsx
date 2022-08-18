import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { authActions, selectAuth } from '../features/auth/authSlice';
import logo from '../logo.svg';

export default function Home() {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  // check login status and redirect
  // useEffect(() => {
  //   if (authState) {
  //     dispatch(authActions.auth());
  //   } else {
  //     dispatch(authActions.unAuth());
  //   }
  // }, [dispatch, authState]);

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit
        <code>src/App.tsx</code>
        and save to reload.
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
        <span> and </span>
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

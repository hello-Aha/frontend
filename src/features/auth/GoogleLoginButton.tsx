import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import styled from '@emotion/styled';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import googlelogo from '../../googleLogo.svg';
// import GoogleButton from 'react-google-button';
import { useAppDispatch } from '../../app/hooks';
import { loginWithGoogleAsyncAction } from './authSlice';

const GoogleButton = styled.div`
  background-color: rgb(255 255 255);
  color: rgb(0 0 0);
  height: 50px;
  width: 100%;
  border: none;
  text-align: center;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 4px 0px;
  font-size: 25px;
  line-height: 48px;
  display: block;
  border-radius: 1px;
  transition: background-color 0.218s ease 0s, border-color 0.218s ease 0s,
    box-shadow 0.218s ease 0s;
  font-family: Roboto, arial, sans-serif;
  cursor: pointer;
  user-select: none;
  margin-bottom: 20px;
`;
const GoogleLogo = styled.div`
  width: 48px;
  height: 48px;
  text-align: center;
  display: block;
  margin-top: 1px;
  margin-left: 1px;
  float: left;
  background-color: rgb(255, 255, 255);
  border-radius: 1px;
  white-space: nowrap;
  line-height: 5px;
  padding: 5px;
`;

export default function GoogleLoginButton() {
  const { REACT_APP_GOOGLE_APP_ID } = process.env;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: REACT_APP_GOOGLE_APP_ID,
        scope: 'https://www.googleapis.com/auth/userinfo.email',
      });
    });
  }, []);
  const googleResponse = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('accessToken' in response) {
      dispatch(
        loginWithGoogleAsyncAction({
          accessToken: response.accessToken,
        })
      )
        .unwrap()
        .then((res) => {
          if (res.accessToken === null) navigate('/signup', { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <GoogleLogin
      clientId={`${REACT_APP_GOOGLE_APP_ID}`}
      render={(renderProps) => (
        <GoogleButton onClick={renderProps.onClick}>
          <GoogleLogo>
            <img
              style={{ width: 35, height: 35 }}
              src={googlelogo}
              alt="logo"
            />
          </GoogleLogo>
          <span>Sign in with google</span>
        </GoogleButton>
      )}
      buttonText="SIGN IN WITH GOOGLE"
      onSuccess={googleResponse}
      onFailure={googleResponse}
    />
  );
}

import React from 'react';
import FacebookLogin, {
  LoginResponse,
} from '@greatsumini/react-facebook-login';
import styled from '@emotion/styled';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginWithFacebookAsyncAction } from './authSlice';

const FaceBookButton = styled.div`
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
const FacebookLogo = styled.div`
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
`;

export default function FacebookLoginButton() {
  const { REACT_APP_FACEBOOK_APP_ID } = process.env;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const responseFacebook = (response: LoginResponse['authResponse']) => {
    if (response !== undefined && 'accessToken' in response) {
      dispatch(
        loginWithFacebookAsyncAction({
          accessToken: response.accessToken,
        })
      )
        .unwrap()
        .then((res) => {
          if (res.accessToken === null) navigate('/signup', { replace: true });
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  };
  return (
    <FacebookLogin
      appId={`${REACT_APP_FACEBOOK_APP_ID}`}
      onSuccess={responseFacebook}
      render={({ onClick }) => (
        <FaceBookButton onClick={onClick}>
          <FacebookLogo>
            <FacebookIcon style={{ color: '#3a5a97', width: 48, height: 48 }} />
          </FacebookLogo>
          <span>Sign in with facebook</span>
        </FaceBookButton>
      )}
    />
  );
}

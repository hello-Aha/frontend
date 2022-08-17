import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookies from "../../app/cookies";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authActions, isAuthenticated } from "../auth/authSlice";
import { getUserAsync, selectUser } from "./userSlice";

export function User() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthenticated);
  const userState = useAppSelector(selectUser);
  // const isAuth = useAppSelector(isAuthenticated);

  //check login status and redirect
  useEffect(() => {
    if(!cookies.get('accessToken')){
      dispatch(authActions.logout())
      navigate('/signin', {replace: true})
    }else{
      dispatch(authActions.login())
    }
  },[dispatch, navigate, isAuth])

  useEffect(() => {
    dispatch(getUserAsync())
  },[dispatch])

  const {account, email, displayName} = userState.user;
  return(
      <div>
          <p>{account}</p>
          <p>{email}</p>
          <p>{displayName}</p>
          <Button component={Link} to="/user/resetpassword">Reset Password</Button>
      </div>
  );
}
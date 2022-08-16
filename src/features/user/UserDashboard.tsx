import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../../app/cookies";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { authActions, isAuthenticated } from "../auth/authSlice";
import { getUserDashBoardAsync, selectUser } from "./userSlice";

export default function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);
  const isAuth = useAppSelector(isAuthenticated);


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
      dispatch(getUserDashBoardAsync())
  }, [dispatch]);

  const users = userState.users;
  return (
      <div>
          hello user dashboard
          {users.map((user) => {
              return <div key={user.account}>{user.account}</div>
          })}
      </div>
  )
}
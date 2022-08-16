import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authActions, isAuthenticated } from "./authSlice";

export default function AuthButton(){
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthenticated);
  const logoutHandler = () => {
    dispatch(authActions.logout());
  }
  if(isAuth){
    return <Button
     sx={{width:94}} 
     color="neutral" 
     variant="outlined" 
     onClick={logoutHandler} >LOGOUT</Button>
  }
  return (
    <Button
     sx={{width:94}} 
     color="neutral" 
     variant="outlined" 
     component={Link} 
     to="signin">LOGIN</Button>
  )
}
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserAsync, selectUser } from "./userSlice";

export function User() {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(selectUser);
    useEffect(() => {
        console.log('effect');
        dispatch(getUserAsync())
    },[dispatch])
    const {account, email, displayName} = userState.user;
    return(
        <div>
            <p>{account}</p>
            <p>{email}</p>
            <p>{displayName}</p>
        </div>
    );
}
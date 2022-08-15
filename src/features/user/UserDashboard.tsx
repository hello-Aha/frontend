import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUserDashBoardAsync, selectUser } from "./userSlice";

export default function UserDashboard() {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(selectUser);
    useEffect(() => {
        dispatch(getUserDashBoardAsync())
    }, [dispatch]);
    const users = userState.users;
    console.log(users);
    return (
        <div>
            hello user dashboard
            {users.map((user) => {
                return <div key={user.account}>{user.account}</div>
            })}
        </div>
    )
}
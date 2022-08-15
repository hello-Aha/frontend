import { domain } from "../../app/config"
import { getData } from "../../app/httpMethod"



export function fetchUser(){
    return getData(`${domain}/users/profile`, '')
}

export function fetchUserDashboard(){
    return getData(`${domain}/users`, '')
}
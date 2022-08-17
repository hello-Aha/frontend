import { domain } from "../../app/config"
import { getData, patchData } from "../../app/httpMethod"



export function fetchUser(){
    return getData(`${domain}/users/profile`, '')
}

export function fetchUserDashboard(){
    return getData(`${domain}/users`, '')
}

export function resetPassword(data: any){
    return patchData(`${domain}/users`, data)
}
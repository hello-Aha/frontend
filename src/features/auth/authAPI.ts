import { domain } from "../../app/config";
import { postData } from "../../app/httpMethod";


export function login(data: any){
    return postData(`${domain}/auth/login`, data)
}
import { domain } from '../../app/config';
import { headMethod, postMethod } from '../../app/httpMethod';

export function login(data: any) {
  return postMethod(`${domain}/auth/login`, data);
}

export function authenticate() {
  return headMethod(`${domain}/auth`);
}

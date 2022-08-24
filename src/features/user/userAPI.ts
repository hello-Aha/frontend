/* eslint-disable @typescript-eslint/no-explicit-any */
import { domain } from '../../app/config';
import { getMethod, patchMethod } from '../../app/httpMethod';

export function fetchUser() {
  return getMethod(`${domain}/users/profile`, '');
}

export function fetchUserDashboard() {
  return getMethod(`${domain}/users`, '');
}

export function resetPassword(data: any) {
  return patchMethod(`${domain}/users/resetPassword`, data);
}

export function updateUser(data: any) {
  return patchMethod(`${domain}/users/`, data);
}

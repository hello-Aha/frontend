import { domain } from '../../app/config';
import { getMethod } from '../../app/httpMethod';

export function fetchUserDashboard() {
  return getMethod(`${domain}/users/dashboard`, '');
}

export function fetchWhatEver() {
  return 'hello';
}

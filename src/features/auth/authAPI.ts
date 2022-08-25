/* eslint-disable @typescript-eslint/no-explicit-any */
import { domain } from '../../app/config';
import { headMethod, postMethod } from '../../app/httpMethod';
import { OauthDTO } from './dtos/OauthDTO';

export function login(data: any) {
  return postMethod(`${domain}/auth/login`, data);
}

export function logout() {
  return postMethod(`${domain}/auth/logout`, {});
}

export function signUp(data: any) {
  return postMethod(`${domain}/auth/signup`, data);
}

export function authenticate() {
  return headMethod(`${domain}/auth`);
}

export function googleAuthenticate(data: OauthDTO) {
  return postMethod(`${domain}/auth/google`, data);
}

export function facebookAuthenticate(data: OauthDTO) {
  return postMethod(`${domain}/auth/facebook`, data);
}

export function resendVerifyEmail(data: any) {
  return postMethod(`${domain}/auth/resendverifyemail`, data);
}

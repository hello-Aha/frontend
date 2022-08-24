/* eslint-disable @typescript-eslint/no-explicit-any */
export const headMethod = (urlString: string) => {
  const options: RequestInit = {
    credentials: 'include',
    method: 'HEAD',
  };
  return fetch(urlString, options);
};

export const postMethod = (urlString: string, data: any) => {
  const options: RequestInit = {
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };
  const url = new URL(urlString);
  return fetch(url, options);
};

export const getMethod = (urlString: string, params: any) => {
  const options: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    method: 'GET',
  };
  const url = new URL(urlString);
  url.search = new URLSearchParams(params).toString();
  return fetch(url, options);
};

export const patchMethod = (urlString: string, data: any) => {
  const options: RequestInit = {
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    method: 'PATCH',
  };
  const url = new URL(urlString);
  return fetch(url, options);
};

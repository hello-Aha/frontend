
export const postData = (urlString: string, data: any) => {
  const options: RequestInit = {
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  };
  let url = new URL(urlString);
    return fetch( url, options)
}

export const getData = (urlString: string, params: any) => {
  const options: RequestInit = {
    credentials: 'include', mode: 'cors', method: 'GET'};
  let url = new URL(urlString);
  url.search = new URLSearchParams(params).toString();
  return fetch(url, options);
}


export const patchData = (urlString: string, data: any) => {
  const options: RequestInit = {
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    method: 'PATCH'
  };
  let url = new URL(urlString);
  return fetch(url, options);
}

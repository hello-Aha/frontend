

export const postData = (url: string, data: any) => {
    return fetch( url, {
        body: JSON.stringify(data),
        // credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
}

export const getData = (urlString: string, params: any) => {
  var url = new URL(urlString);
  url.search = new URLSearchParams(params).toString();
  return fetch(url, {credentials: 'include', mode: 'cors'})
}

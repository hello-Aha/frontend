const { REACT_APP_SERVER_SIDE_DOMAIN, REACT_APP_HTTP_PROTOCAL } = process.env;
export const domain = `${REACT_APP_HTTP_PROTOCAL}://${REACT_APP_SERVER_SIDE_DOMAIN}`;
const str = 'hello react';
const config = {
  domain,
  str,
};

export default config;

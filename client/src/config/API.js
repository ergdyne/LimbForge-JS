let AXIOS_CONFIG = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true
}

//DEPLOY: When deploying change this. This is good enough set up.
//change to load env


let API_DOMAIN = process.env.API_URL
let API_URL = `${API_DOMAIN}/api/`

export {
  AXIOS_CONFIG,
  API_URL,
  API_DOMAIN
}
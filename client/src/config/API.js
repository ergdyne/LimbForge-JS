let AXIOS_CONFIG = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true
}

//DEPLOY: When deploying change this. This is good enough set up.
//change to load env
let API_URL = process.env.API_URL
export {
  AXIOS_CONFIG,
  API_URL
}
let AXIOS_CONFIG = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true
}

//DEPLOY: When deploying change this. This is good enough set up.
let API_URL = '/api/' //'https://limbforge.ergdyne.com:8000/api/'
export {
  AXIOS_CONFIG,
  API_URL
}
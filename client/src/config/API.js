let AXIOS_CONFIG = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true
}

//DEPLOY: When deploying change this. This is good enough set up.
//change to load env
let API_URL = process.env.API_URL//'/api/' //'https://limbforge.ergdyne.com:8000/api/'
console.log(process.env.API_URL)
console.log('API', API_URL)
export {
  AXIOS_CONFIG,
  API_URL
}
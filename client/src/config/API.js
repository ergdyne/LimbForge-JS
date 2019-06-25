let AXIOS_CONFIG = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true
}

let API_URL = `http://localhost:3000/`

export {
  AXIOS_CONFIG,
  API_URL
}
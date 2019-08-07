//Set header files for API calls to include cookies
let AXIOS_CONFIG = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true
}

//API url is mapped from the package.json file as part of the build script.
let API_DOMAIN = process.env.API_URL
let API_URL = `${API_DOMAIN}/api/`

export {
  AXIOS_CONFIG,
  API_URL,
  API_DOMAIN
}
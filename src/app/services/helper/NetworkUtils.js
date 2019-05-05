import axios from 'axios'

class NetworkUtils {
  constructor(options) {
    this.baseUrl = options.baseUrl
  }

  get(endpoint, token = null) {
    return this.requestHttp("GET", this.baseUrl + endpoint, null, token)
  }

  post(endpoint, params, token = null) {
    return this.requestHttp("POST", this.baseUrl + endpoint, params, token)
  }

  put(endpoint, params, token = null) {
    return this.requestHttp("PUT", this.baseUrl + endpoint, params, token)
  }

  delete(endpoint, params, token = null) {
    return this.requestHttp("DELETE", this.baseUrl + endpoint, params, token)
  }

  requestHttp(method, url, params, token) {
    return new Promise((resolve, reject) => {

      var options = {
        method,
        url,
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      if (params) {
        options.data = params
      }
      if (token) {
        options.headers["Authorization"] = 'Bearer ' + token
      }

      axios(options)
      .then((response)=>{
        resolve({ statusCode: response.status, body: response.data })
      })
      .catch((error)=>{
        console.log(error);
        if (error.response != undefined) {
          resolve({ statusCode: error.response.status, body: error.response.data })
        }else{
          reject(__.t("Can not connect to server"))
        }
      })
    })
  }
}

export default NetworkUtils

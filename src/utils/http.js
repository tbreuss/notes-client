import axios from 'axios'
import router from '@/router'
import storage from './storage'

let instance = axios.create({
  baseURL: storage.getApiUrl()
})

instance.interceptors.request.use(config => {
  let token = storage.getApiToken()
  if (token !== null) {
    config.headers.Authorization = 'Bearer ' + token
  }
  //console.info("Axios request success", config)
  return config
}, error => {
  //console.error("Axios request error", error)
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  //console.info("Axios response success", response)
  return response
}, error => {
  //console.error("Axios response error", error.response)
  if (error.response.status == 404) {
    router.push({name: '404', params: {error: error.response}})
  } else if (error.response.status > 401) {
    router.push({name: 'error', params: {error: error.response}})
  }
  return Promise.reject(error)
})

export const http = instance

export default {
  request(method, url, data, successCb = null, errorCb = null) {
    let config = {}
    if (['put', 'post'].indexOf(method) >= 0) {
      config.headers = {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
    return instance[method](url, data, config).then(
      (response) => {
        successCb(response.data)
      },
      errorCb)
  },

  get(url, data, successCb = null, errorCb = null) {
    return this.request('get', url, data, successCb, errorCb)
  },

  post(url, data, successCb = null, errorCb = null) {
    return this.request('post', url, data, successCb, errorCb)
  },

  put(url, data, successCb = null, errorCb = null) {
    return this.request('put', url, data, successCb, errorCb)
  },

  delete(url, data = {}, successCb = null, errorCb = null) {
    return this.request('delete', url, data, successCb, errorCb)
  },

  /**
   * A shortcut method to ping and check if the user session is still valid.
   */
  ping() {
    let http = axios.create({
      baseURL: storage.getApiUrl()
    })
    return http.get('ping')
  }
}

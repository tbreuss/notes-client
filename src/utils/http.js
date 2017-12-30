import axios from 'axios'
import router from '@/router'

let baseUrl = 'https://kdb-api.tebe.ch/public/api.php/'

if (process.env.NODE_ENV == 'development') {
  baseUrl = 'http://localhost:9999/api.php/'
}

let instance = axios.create({
  baseURL: baseUrl
})

instance.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
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

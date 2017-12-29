import axios from 'axios'

let baseUrl = 'http://testing.tebe.ch/wissen-api/public/api.php/'

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
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export const http = instance

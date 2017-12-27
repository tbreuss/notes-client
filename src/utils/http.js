import axios from 'axios'

var instance = axios.create({
  //baseURL: 'http://testing.tebe.ch/wissen-api/public/api.php/',
  baseURL: 'http://localhost:9999/api.php/'
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

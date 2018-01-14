/* globals localStorage */
import {http} from '@/utils/http'

export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.API_TOKEN) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    postLogin({username:email, password:pass})
      .then(token => {
        localStorage.setItem('API_TOKEN', token)
        if (cb) cb(true)
        this.onChange(true)
      })
      .catch(error => {
        if (cb) cb(false, error.response.data)
        this.onChange(false)
      })
  },

  getToken () {
    return localStorage.API_TOKEN
  },

  getPayload () {
    let token = this.getToken()
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  },

  hasPermission (scope)
  {
    let payload = this.getPayload()
    // todo: check if user.role exists
    if (payload.user.role == 'admin') {
      return true
    }
    // todo: check if user.scopes exists and is an array
    if (payload.user.scopes.indexOf(scope) != -1) {
      return true
    }
    return false
  },

  hasPermissionForUser(scope, userId)
  {
    let payload = this.getPayload()
    // todo: check if user.role exists
    if (payload.user.role == 'admin') {
      return true
    }
    // todo: check if user.scopes exists and is an array
    if (payload.user.scopes.indexOf(scope) != -1) {
      if (payload.user.id == userId) {
        return true
      }
    }
    return false
  },

  logout (cb) {
    delete localStorage.API_TOKEN
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.API_TOKEN
  },

  onChange () {}
}

function postLogin (params) {
  var url = 'auth/login'
  var config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }
  return http
    .post(url, params, config)
    .then(response => response.data)
}

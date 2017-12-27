/* globals localStorage */
import {http} from '@/utils/http'

export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    postLogin({username:email, password:pass})
      .then(token => {
        localStorage.setItem('token', token)
        if (cb) cb(true)
        this.onChange(true)
      })
      .catch(error => {
        if (cb) cb(false, error.response.data)
        this.onChange(false)
      })
  },

  getToken () {
    alert('token')
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
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

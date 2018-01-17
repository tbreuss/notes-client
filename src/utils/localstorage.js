const API_URL = 'API_URL'
const API_TOKEN = 'API_TOKEN'

function get (key, defaultValue = null) {
  let value = localStorage.getItem(key)
  if (null === value) {
    value = defaultValue
  }
  return value
}

function set (key, value) {
  value = value.trim()
  if (value.length == 0) {
    localStorage.removeItem(key)
  } else {
    localStorage.setItem(key, value)
  }
}

export default {
  getApiUrl () {
    return get(API_URL, '')
  },
  setApiUrl (url) {
    set(API_URL, url)
  },
  getApiToken () {
    return get(API_TOKEN, '')
  },
  setApiToken (token) {
    set(API_TOKEN, token)
  }
}

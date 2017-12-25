// http://testing.tebe.ch/wissen-api/public/api.php/articles

import axios from 'axios'

var http = axios.create({
  //baseURL: 'http://testing.tebe.ch/wissen-api/public/api.php/',
  baseURL: 'http://localhost:9999/api.php/'
})

if (localStorage.getItem('token')) {
  http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
}

// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

function getArticle (id) {
  var url = 'articles/' + id
  return http.get(url).then(response => response.data)
}

function getArticles (params) {
  var url = 'articles'
  return http.get(url, {params: params}).then(response => response.data)
}

function getSelectedArticles (mode) {
  var url = 'lastest'
  if (mode == 'popular') {
    url = 'popular'
  }
  if (mode == 'latest') {
    url = 'latest'
  }
  if (mode == 'modified') {
    url = 'modified'
  }
  return http
    .get(url)
    .then(response => response.data)
}

function postArticle (params) {
  var url = 'add-article'
  var config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }
  return http
    .post(url, params, config)
    .then(response => response.data)
}

function getTags (params) {
  var url = 'tags'
  return http.get(url, {params: params}).then(response => response.data)
}

function getSelectedTags (params) {
  var url = 'selectedtags'
  return http.get(url, {params: params}).then(response => response.data)
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

export {
  getArticle,
  getArticles,
  getSelectedArticles,
  postArticle,
  getTags,
  getSelectedTags,
  postLogin
}

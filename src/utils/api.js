// http://testing.tebe.ch/wissen-api/public/api.php/articles

import {http} from '@/utils/http'

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

function putArticle (id, params) {
  var url = 'articles/' + id
  var config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }
  return http
    .put(url, params, config)
    .then(response => response.data)
}

function deleteArticle (id) {
  var url = 'articles/' + id
  var config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }
  return http
    .delete(url)
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

function getUsers (params) {
  var url = 'users'
  return http.get(url, {params: params}).then(response => response.data)
}

export {
  getArticle,
  getArticles,
  getSelectedArticles,
  postArticle,
  putArticle,
  deleteArticle,
  getTags,
  getSelectedTags,
  getUsers
}

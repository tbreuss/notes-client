const API_TOKEN = 'API_TOKEN'
const TAGS_PAGE_SORT = 'TagsPage.sort'
const ARTICLES_PAGE = 'ArticlesPage.page'
const ARTICLES_SEARCH = 'ArticlesPage.q'
const ARTICLES_SORT = 'ArticlesPage.sort'
const ARTICLES_TAGS = 'ArticlesPage.selectedTags'

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}

function getFromLocalStorage (key, defaultValue = null) {
  let value = localStorage.getItem(key)
  if (null === value) {
    value = defaultValue
  }
  return value
}

function setToLocalStorage (key, value) {
  if (value === null) {
    localStorage.removeItem(key)
  } else {
    localStorage.setItem(key, value)
  }
}

function getFromSessionStorage (key, defaultValue = null) {
  let value = sessionStorage.getItem(key)
  if (null === value) {
    value = defaultValue
  }
  return value
}

function setToSessionStorage (key, value) {
  if (value === null) {
    sessionStorage.removeItem(key)
  } else {
    sessionStorage.setItem(key, value)
  }
}

export default {
  getApiToken () {
    return getFromLocalStorage(API_TOKEN, null)
  },
  setApiToken (token) {
    setToLocalStorage(API_TOKEN, token)
  },
  getTagsPageSort () {
    return getFromSessionStorage(TAGS_PAGE_SORT, 'frequency')
  },
  setTagsPageSort (sort) {
    setToSessionStorage(TAGS_PAGE_SORT, sort)
  },
  getArticlesPage () {
    return getFromSessionStorage(ARTICLES_PAGE, 1)
  },
  setArticlesPage (page) {
    setToSessionStorage(ARTICLES_PAGE, page)
  },
  getArticlesSearch () {
    return getFromSessionStorage(ARTICLES_SEARCH, '')
  },
  setArticlesSearch (search) {
    setToSessionStorage(ARTICLES_SEARCH, search)
  },
  getArticlesSort () {
    return getFromSessionStorage(ARTICLES_SORT, 'title')
  },
  setArticlesSort (sort) {
    setToSessionStorage(ARTICLES_SORT, sort)
  },
  getArticlesTags () {
    if (sessionStorage.getObj(ARTICLES_TAGS)) {
      return sessionStorage.getObj(ARTICLES_TAGS)
    }
    return []
  },
  setArticlesTags (tags) {
    sessionStorage.setObj(ARTICLES_TAGS, tags)
  }
}

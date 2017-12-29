import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import auth from '@/utils/auth'
import AddArticle from '@/components/AddArticle'
import ArticlesPage from '@/components/ArticlesPage'
import ArticlePage from '@/components/ArticlePage'
import LoginPage from '@/components/LoginPage'
import PageNotFound from '@/components/PageNotFound'
import StartPage from '@/components/StartPage'
import TagsPage from '@/components/TagsPage'

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      component: StartPage
    },
    {
      path: '/articles',
      component: ArticlesPage
    },
    {
      path: '/article/:id',
      component: ArticlePage,
      props: true
    },
    {
      path: '/article/edit/:id',
      component: AddArticle,
      props: true
    },
    {
      path: '/add-article',
      component: AddArticle,
      beforeEnter: requireAuth
    },
    {
      path: '/tags',
      component: TagsPage
    },
    {
      path: '/login',
      component: LoginPage
    },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    },
    {
      path: '/404',
      component: PageNotFound
    },
    {
      path: '*',
      redirect: '/404'
    },

  ]
})

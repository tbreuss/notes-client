import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import auth from '@/utils/auth'
import ArticleForm from '@/pages/ArticleForm'
import Articles from '@/pages/Articles'
import Article from '@/pages/Article'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Start from '@/pages/Start'
import Tags from '@/pages/Tags'

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
      name: 'start',
      component: Start
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article,
      props: true
    },
    {
      path: '/article-edit/:id',
      name: 'article-edit',
      component: ArticleForm,
      beforeEnter: requireAuth,
      props: true
    },
    {
      path: '/article-add',
      name: 'article-add',
      component: ArticleForm,
      beforeEnter: requireAuth
    },
    {
      path: '/tags',
      name: 'tags',
      component: Tags
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    { path: '/logout',
      name: 'logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    },

  ]
})

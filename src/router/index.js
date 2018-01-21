import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import auth from '@/utils/auth'
import ArticleForm from '@/pages/ArticleForm'
import Articles from '@/pages/Articles'
import Article from '@/pages/Article'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Settings from '@/pages/Settings'
import Start from '@/pages/Start'
import Tags from '@/pages/Tags'
import Users from '@/pages/Users'
import User from '@/pages/User'
import Error from '@/pages/Error'

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
      component: Start,
      beforeEnter: requireAuth
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      beforeEnter: requireAuth
    },
    {
      path: '/articles/:id/update',
      name: 'article-edit',
      component: ArticleForm,
      beforeEnter: requireAuth,
      props: true
    },
    {
      path: '/articles/add',
      name: 'article-add',
      component: ArticleForm,
      beforeEnter: requireAuth
    },
    {
      path: '/articles/:id',
      name: 'article',
      component: Article,
      props: true,
      beforeEnter: requireAuth
    },
    {
      path: '/tags',
      name: 'tags',
      component: Tags,
      beforeEnter: requireAuth
    },
    {
      path: '/users/:id',
      name: 'user',
      component: User,
      beforeEnter: requireAuth,
      props: true
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      beforeEnter: requireAuth
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
        next('/login')
      }
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      props: true
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '*',
      redirect: '/404'
    },

  ]
})

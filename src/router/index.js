import Vue from 'vue'
import Router from 'vue-router'
import AddArticle from '@/components/AddArticle'
import ArticlesPage from '@/components/ArticlesPage'
import ArticlePage from '@/components/ArticlePage'
import LoginPage from '@/components/LoginPage'
import PageNotFound from '@/components/PageNotFound'
import StartPage from '@/components/StartPage'
import TagsPage from '@/components/TagsPage'

Vue.use(Router)

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
            path: '/add-article',
            component: AddArticle
        },
        {
            path: '/tags',
            component: TagsPage
        },
        {
            path: '/login',
            component: LoginPage
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

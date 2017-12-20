import Vue from 'vue'
import Router from 'vue-router'
import ArticlesPage from '@/components/ArticlesPage'
import ArticlePage from '@/components/ArticlePage'
import TagsPage from '@/components/TagsPage'
import StartPage from '@/components/StartPage'
import PageNotFound from '@/components/PageNotFound'
import AddArticle from '@/components/AddArticle'

Vue.use(Router)

export default new Router({
    routes: [
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
            path: '/',
            component: StartPage
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

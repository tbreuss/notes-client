// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
var markdown = require( "markdown" ).markdown;

Vue.config.productionTip = false

Vue.filter('markdown', function (value) {
    if (!value) return ''
    return markdown.toHTML(value)
})

Vue.filter('date', function (value) {
    var d = new Date(value);
    return d.toLocaleDateString();
})

import VueMarkdown from 'vue-markdown' // production
import ArticlesComponent from '@/components/ArticlesComponent'
import ArticleTags from '@/components/ArticleTags'

Vue.component('articles', ArticlesComponent)
Vue.component('article-tags', ArticleTags)
Vue.component('vue-markdown', VueMarkdown)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})

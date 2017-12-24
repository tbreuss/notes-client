// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMarkdown from 'vue-markdown' // production
import ArticlesComponent from '@/components/ArticlesComponent'
import ArticleTags from '@/components/ArticleTags'

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}

Vue.config.productionTip = false

Vue.filter('markdown', function (value) {
  if (!value) return ''
  return markdown.toHTML(value)
})

Vue.filter('date', function (value) {
  var d = new Date(value)
  return d.toLocaleDateString()
})

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

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import _ from 'lodash'
import Vue from 'vue'
import router from '@/router'
import App from '@/App'
import ArticlesComponent from '@/components/ArticlesComponent'
import ArticleTags from '@/components/ArticleTags'
import ModalDialog from '@/components/ModalDialog'
import TextareaUpload from '@/components/TextareaUpload'
import LayoutDefault from '@/layouts/default'
import LayoutLogin from '@/layouts/login'
import LayoutStart from '@/layouts/start'
import Navbar from '@/components/Navbar'
import { getPing } from '@/utils/api'

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}

Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
  alert('An error occured. Please see console error log')
  console.error(err)
  console.error(vm)
  console.error(info)
}

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})

Vue.directive('permission', {
  bind: function (el, binding) {
    console.log(binding.value) // => "white"
  }
})

Vue.filter('date', function (strDate) {
  //  Safari & IE browsers do not support the date format “yyyy-mm-dd”
  strDate = strDate.replace(/-/g, '/')
  let date = new Date(strDate)
  let year = date.getFullYear()
  let month = _.padStart(date.getMonth()+1, 2, '0')
  let day = _.padStart(date.getDate(), 2, '0')
  return `${day}.${month}.${year}`;
})

Vue.component('articles', ArticlesComponent)
Vue.component('article-tags', ArticleTags)
Vue.component('modal-dialog', ModalDialog)
Vue.component('textarea-upload', TextareaUpload)
Vue.component('layout-login', LayoutLogin)
Vue.component('layout-default', LayoutDefault)
Vue.component('layout-start', LayoutStart)
Vue.component('navbar', Navbar)

getPing()
  .catch((errors) => {
    router.push('/settings')
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

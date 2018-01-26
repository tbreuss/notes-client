// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import ArticlesComponent from '@/components/Articles'
import ArticleTags from '@/components/ArticleTags'
import ModalDialog from '@/components/ModalDialog'
import TextareaUpload from '@/components/TextareaUpload'
import LayoutDefault from '@/layouts/Default'
import LayoutLogin from '@/layouts/Login'
import LayoutStart from '@/layouts/Start'
import Navbar from '@/components/Navbar'
import DateFilter from '@/filters/Date'
import FocusDirective from './directives/Focus'
import PermissionDirective from './directives/Permission'
import router from '@/router'
import http from '@/utils/http'

import 'bootstrap'
import 'prismjs/prism'
// todo: import languages
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-php'
import 'prismjs/themes/prism.css'
import '@/assets/css/styles.css'


Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
  alert('An error occured. Please see console error log')
  console.error(err)
  console.error(vm)
  console.error(info)
}

Vue.component('articles', ArticlesComponent)
Vue.component('article-tags', ArticleTags)
Vue.component('modal-dialog', ModalDialog)
Vue.component('textarea-upload', TextareaUpload)
Vue.component('layout-login', LayoutLogin)
Vue.component('layout-default', LayoutDefault)
Vue.component('layout-start', LayoutStart)
Vue.component('navbar', Navbar)

Vue.directive('focus', FocusDirective)
Vue.directive('permission', PermissionDirective)

Vue.filter('date', DateFilter)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

http.ping()
  .catch(() => {
    router.push('/settings')
  })


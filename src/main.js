// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/rem'
import './css/reset.css'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
import {Swipe,SwipeItem,Toast } from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(VueLazyload)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

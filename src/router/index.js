import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index/index'
import paihang from '../views/paihang/index'
import paihanginfo from '../views/paihang/info'
import bookinfo from '../views/paihang/bookinfo'
import read from '../views/common/read'
import shujia from '../views/shujia/index'
import fenlei from '../views/fenlei/index'
import search from '../views/search/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/',
      redirect : '/book'
    },
    {
      path : '/search',
      component : search
    },
    {
      path : '/fenlei',
      component : fenlei 
    },
    {
      path : '/book',
      component : shujia
    },
    {
      path: '/index',
      name: 'HelloWorld',
      component: index
    },
    {
      path : '/paihang',
      name : 'paihang',
      component :paihang,
      children : [
       {
        path : ':id',
        component : paihanginfo
       }
      ]
    },
    {
      path : '/bookinfo',
      name : 'bookinfo',
      component : bookinfo
    },
    {
      path : '/read',
      name : 'read',
      component : read
    }
  ]
})

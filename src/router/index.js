import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/index'

import login from '@/pages/login'
import home from '@/pages/home'
import userList from '@/pages/userList'
import adminList from '@/pages/adminList'
import shopList from '@/pages/shopList'
import addShop from '@/pages/addShop'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        }, {
          path: '/userList',
          name: 'userList',
          component: userList
        }, {
          path: '/adminList',
          name: 'adminList',
          component: adminList
        }, {
          path: '/shopList',
          name: 'shopList',
          component: shopList
        }, {
          path: '/addShop',
          name: 'addShop',
          component: addShop
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

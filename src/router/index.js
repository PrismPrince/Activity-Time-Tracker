import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Welcome from '@/components/Welcome'
import Home from '@/components/Home'
import Stopwatch from '@/components/Stopwatch'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stopwatch',
      name: 'stopwatch',
      component: Stopwatch,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('/')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router

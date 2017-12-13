import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Welcome from '@/components/Welcome'
import NotFound from '@/components/Not-Found'
import Home from '@/components/Home'
import TaskTimer from '@/components/Task-Timer'
import ImageLinkGenerator from '@/components/Image-Link-Generator'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
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
      path: '/task-timer',
      name: 'task-timer',
      component: TaskTimer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/image-link-generator',
      name: 'image-link-generator',
      component: ImageLinkGenerator,
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

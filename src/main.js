// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import App from './App'
import router from './router'

Vue.use(VueFire)
Vue.use(VueMaterial)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyCSQTk-Tg9Pif1VbxwdLF--q_xHmlIr2L4',
  authDomain: 'activity-time-tracker.firebaseapp.com',
  databaseURL: 'https://activity-time-tracker.firebaseio.com',
  projectId: 'activity-time-tracker',
  storageBucket: 'activity-time-tracker.appspot.com',
  messagingSenderId: '953694498228'
})

/* eslint-disable no-new */
let app

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      data: {
        auth: user
      },
      template: '<App :auth="auth"/>',
      components: { App }
    })
  }
})

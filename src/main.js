/*!
 * PA Tools v0.0.0
 * (c) 2017 Dave Dane Pacilan
 * Released under the MIT License.
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from './components/firebaseInit'
import VueFire from 'vuefire'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import App from './App'
import router from './router'

Vue.use(VueFire)
Vue.use(VueMaterial)

Vue.config.productionTip = false

/* eslint-disable no-new */
let app

firebase.auth().onAuthStateChanged(auth => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })
  }
})

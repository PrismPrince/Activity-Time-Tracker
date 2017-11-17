<template>
  <div class="navbar">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSideNav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">Activity Time Tracker</h2>

      <md-button v-if="auth" @click="logout">Log Out</md-button>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSideNav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Welcome to Your Vue.js App</h3>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <span>Essential Links</span>
          <md-list-expand>
            <md-list>
              <md-list-item class="md-inset" href="https://vuejs.org" target="_blank">Core Docs</md-list-item>
              <md-list-item class="md-inset" href="https://forum.vuejs.org" target="_blank">Forum</md-list-item>
              <md-list-item class="md-inset" href="https://chat.vuejs.org" target="_blank">Community Chat</md-list-item>
              <md-list-item class="md-inset" href="https://twitter.com/vuejs" target="_blank">Twitter</md-list-item>
              <md-list-item class="md-inset" href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</md-list-item>
            </md-list>
          </md-list-expand>
        </md-list-item>

        <md-list-item>
          <span>Ecosystem</span>
          <md-list-expand>
            <md-list>
              <md-list-item class="md-inset" href="http://router.vuejs.org/" target="_blank">vue-router</md-list-item>
              <md-list-item class="md-inset" href="http://vuex.vuejs.org/" target="_blank">vuex</md-list-item>
              <md-list-item class="md-inset" href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</md-list-item>
              <md-list-item class="md-inset" href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</md-list-item>
            </md-list>
          </md-list-expand>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'navbar',
  props: {
    auth: {
      type: Object,
      default: null,
      required: true
    }
  },
  methods: {
    toggleLeftSideNav () {
      this.$refs.leftSideNav.toggle()
    },
    logout () {
      firebase.auth().signOut().then(() => {
        // this.$router.replace('login')
      })
    }
  }
}
</script>

<style scoped>
  .navbar {
    margin-bottom: 20px;
  }
</style>

<template>
  <div class="home">
    <navbar :auth="auth"/>
    <md-layout md-align="center">
      <md-layout md-flex="70">
        <md-whiteframe class="menu md-whiteframe-1dp">
          <md-toolbar>
            <h2 class="md-title">Menu</h2>
          </md-toolbar>
          <md-list>
            <md-list-item class="md-inset" @click.prevent="$router.replace('/stopwatch')">Task Timer</md-list-item>
            <md-list-item class="md-inset" @click.prevent="$router.replace('/image-link-generator')">Image Link Generator</md-list-item>
          </md-list>
        </md-whiteframe>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import firebase from './firebaseInit'
import navbar from '@/components/_navbar'

export default {
  name: 'home',
  data () {
    return {
      auth: firebase.auth().currentUser
    }
  },
  components: {
    navbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .menu {
    width: 100%;
  }
</style>

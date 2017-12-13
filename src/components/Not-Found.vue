<template>
  <div class="home">
    <navbar :auth="auth"/>
    <md-layout md-align="center">
      <md-layout md-flex="70">
        <md-whiteframe class="menu md-whiteframe-1dp">
          Not Found <md-button class="md-primary" @click="$router.replace('/')">Go Back</md-button>
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
</style>

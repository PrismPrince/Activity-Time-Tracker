<template>
  <div id="app">
    <navbar :auth="auth"/>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/_navbar'

export default {
  name: 'app',
  props: ['auth'],
  components: {
    navbar
  }
}
</script>

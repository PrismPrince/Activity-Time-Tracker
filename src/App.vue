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
  props: {
    auth: {
      type: Object,
      default: null,
      required: true
    }
  },
  components: {
    navbar
  }
}
</script>

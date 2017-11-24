<template>
  <div class="home">
    <navbar :auth="auth"/>
    welcome
  </div>
</template>

<script>
// import firebase from 'firebase'
import navbar from '@/components/_navbar'

export default {
  name: 'home',
  data () {
    return {
      auth: true,
      login: {
        email: {
          value: '',
          dirty: false,
          error: {
            status: false,
            message: ''
          }
        },
        password: {
          value: '',
          dirty: false,
          error: {
            status: false,
            message: ''
          }
        },
        error: {
          status: false,
          message: ''
        }
      },
      register: {
        email: {
          value: '',
          dirty: false,
          error: {
            status: false,
            message: ''
          }
        },
        password: {
          value: '',
          dirty: false,
          error: {
            status: false,
            message: ''
          }
        },
        confirmPassword: {
          value: '',
          dirty: false,
          error: {
            status: false,
            message: ''
          }
        },
        error: {
          status: false,
          message: ''
        }
      }
    }
  },
  components: {
    navbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

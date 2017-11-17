<template>
  <div class="home">
    welcome
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

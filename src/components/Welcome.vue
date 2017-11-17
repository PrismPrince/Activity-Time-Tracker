<template>
  <div class="welcome">
    <md-layout md-align="center">
      <md-layout class="form" md-flex="80">
        <md-tabs class="md-whiteframe-1dp">
          <md-tab md-label="Log in">
            <md-input-container :class="{'md-input-invalid': login.email.error.status}" md-clearable>
              <label>E-mail Address</label>
              <md-input v-model="login.email.value"></md-input>
              <span v-if="login.email.error.status" class="md-error">{{ login.email.error.message }}</span>
            </md-input-container>

            <md-input-container :class="{'md-input-invalid': login.password.error.status}" md-has-password>
              <label>Password</label>
              <md-input type="password" v-model="login.password.value"></md-input>
              <span v-if="login.password.error.status" class="md-error">{{ login.password.error.message }}</span>
            </md-input-container>

            <md-button class="md-primary md-raised" @click="loginUser" :disabled="!checkLoginStatus">Login</md-button>
          </md-tab>

          <md-tab md-label="Register">
            <md-input-container :class="{'md-input-invalid': register.email.error.status}" md-clearable>
              <label>E-mail Address</label>
              <md-input v-model="register.email.value"></md-input>
              <span v-if="register.email.error.status" class="md-error">{{ register.email.error.message }}</span>
            </md-input-container>

            <md-input-container :class="{'md-input-invalid': register.password.error.status}" md-has-password>
              <label>Password</label>
              <md-input type="password" v-model="register.password.value"></md-input>
              <span v-if="register.password.error.status" class="md-error">{{ register.password.error.message }}</span>
            </md-input-container>

            <md-input-container :class="{'md-input-invalid': register.confirmPassword.error.status}" md-has-password>
              <label>Confirm Password</label>
              <md-input type="password" v-model="register.confirmPassword.value"></md-input>
              <span v-if="register.confirmPassword.error.status" class="md-error">{{ register.confirmPassword.error.message }}</span>
            </md-input-container>

            <md-button class="md-primary md-raised" @click="registerUser" :disabled="!checkRegisterStatus">Register</md-button>
          </md-tab>
        </md-tabs>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Welcome',
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
  },
  computed: {
    checkLoginStatus () {
      return this.login.email.error.status === false && this.login.password.error.status === false && this.login.email.dirty === true && this.login.password.dirty === true
    },
    checkRegisterStatus () {
      return this.register.email.error.status === false && this.register.password.error.status === false && this.register.confirmPassword.error.status === false && this.register.email.dirty === true && this.register.password.dirty === true && this.register.confirmPassword.dirty === true
    }
  },
  watch: {
    'login.email.value' () {
      this.login.email.dirty = true

      let eRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (this.login.email.value === '') {
        this.login.email.error.status = true
        this.login.email.error.message = 'E-mail address cannot be empty.'
      } else if (!eRegEx.test(this.login.email.value)) {
        this.login.email.error.status = true
        this.login.email.error.message = 'Not a valid e-mail address.'
      } else {
        this.login.email.error.status = false
        this.login.email.error.message = ''
      }
    },
    'login.password.value' () {
      this.login.password.dirty = true

      if (this.login.password.value === '') {
        this.login.password.error.status = true
        this.login.password.error.message = 'Password cannot be empty.'
      } else {
        this.login.password.error.status = false
        this.login.password.error.message = ''
      }
    },
    'register.email.value' () {
      this.register.email.dirty = true

      let eRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (this.register.email.value === '') {
        this.register.email.error.status = true
        this.register.email.error.message = 'E-mail address cannot be empty.'
      } else if (!eRegEx.test(this.register.email.value)) {
        this.register.email.error.status = true
        this.register.email.error.message = 'Not a valid e-mail address.'
      } else {
        this.register.email.error.status = false
        this.register.email.error.message = ''
      }
    },
    'register.password.value' () {
      this.register.password.dirty = true

      if (this.register.password.value === '') {
        this.register.password.error.status = true
        this.register.password.error.message = 'Password cannot be empty.'
      } else if (this.register.password.value.length < 8) {
        this.register.password.error.status = true
        this.register.password.error.message = 'Password must contain at least 8 characters.'
      } else {
        this.register.password.error.status = false
        this.register.password.error.message = ''
      }
    },
    'register.confirmPassword.value' () {
      this.register.confirmPassword.dirty = true

      if (this.register.confirmPassword.value === '') {
        this.register.confirmPassword.error.status = true
        this.register.confirmPassword.error.message = 'Password cannot be empty.'
      } else if (this.register.confirmPassword.value !== this.register.password.value) {
        this.register.confirmPassword.error.status = true
        this.register.confirmPassword.error.message = 'Password does not match.'
      } else {
        this.register.confirmPassword.error.status = false
        this.register.confirmPassword.error.message = ''
      }
    }
  },
  methods: {
    loginUser () {
      if (this.checkLoginStatus) {
        firebase.auth().signInWithEmailAndPassword(this.login.email.value, this.login.password.value)
          .then(user => {
            console.log(user)
            // this.$router.replace('home')
          }, err => console.log(err))
      } else {

      }
    },
    registerUser () {
      if (this.checkRegisterStatus) {
        firebase.auth().createUserWithEmailAndPassword(this.register.email.value, this.register.password.value)
          .then(user => {
            // this.$router.replace('home')
          }, err => alert('Error: ' + err.message))
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

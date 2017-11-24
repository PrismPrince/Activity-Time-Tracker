<template>
  <div class="welcome">
    <navbar/>
    <md-layout md-align="center">
      <md-layout class="form" md-flex="40">
        <md-tabs class="md-whiteframe-1dp">
          <md-tab md-label="Google Login">
            <md-card class="md-accent note-block-error" v-if="google.error.status">
              <md-button class="md-icon-button close-button" @click="google.error.status = false">
                <md-icon>close</md-icon>
              </md-button>
              <md-card-content>{{ google.error.message }}</md-card-content>
            </md-card>

            <p>
              Log in with your Google account with just one click!
              <md-button class="md-raised register-google" @click="googleLogin">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" class="abcRioButtonSvg">
                  <g>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg> Log in
              </md-button>
            </p>
          </md-tab>

          <md-tab md-label="Login">
            <md-card class="md-accent note-block-error" v-if="login.error.status">
              <md-button class="md-icon-button close-button" @click="login.error.status = false">
                <md-icon>close</md-icon>
              </md-button>
              <md-card-content>
                {{ login.error.message }}
              </md-card-content>
            </md-card>

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

            <md-button class="md-primary md-raised" @click="loginUser" :disabled="!checkLoginStatus">Log in</md-button>
          </md-tab>

          <md-tab md-label="Register">
            <md-card class="md-accent note-block-error" v-if="register.error.status">
              <md-button class="md-icon-button close-button" @click="register.error.status = false">
                <md-icon>close</md-icon>
              </md-button>
              <md-card-content>{{ register.error.message }}</md-card-content>
            </md-card>

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
import navbar from '@/components/_navbar'

export default {
  name: 'Welcome',
  data () {
    return {
      auth: false,
      google: {
        error: {
          status: false,
          message: ''
        }
      },
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
            this.$router.replace('/home')
          }, err => {
            this.login.error.status = true
            this.login.error.message = err.message
          })
      }
    },
    registerUser () {
      if (this.checkRegisterStatus) {
        firebase.auth().createUserWithEmailAndPassword(this.register.email.value, this.register.password.value)
          .then(user => {
            this.$router.replace('/home')
          }, err => {
            this.register.error.status = true
            this.register.error.message = err.message
          })
      }
    },
    googleLogin () {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
        this.$router.replace('/home')
      }).catch(err => {
        this.google.error.status = true
        this.google.error.message = err.message
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .close-button {
    position: absolute;
    right: 0;
  }

  .note-block-error {
    margin-bottom: 20px;
  }

  .note-block-error .md-card-content {
    padding-right: 50px;
  }

  .register-google {
    margin-top: -10px;
  }

  .divider-or {
    width: 100%;
    height: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .12);
    text-align: center;
  }

  .divider-or > span {
    padding: 0 10px;
    background-color: #fff;
  }
</style>

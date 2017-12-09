<template>
  <div class="stopwatch">
    <navbar :auth="auth"/>
    <md-layout md-align="center">
      <md-layout md-flex="70">
        <md-input-container md-clearable>
          <label>Task (press enter to add)</label>
          <md-input v-model="task" @keyup.enter.native="addTask"></md-input>
        </md-input-container>
        <md-table-card class="md-whiteframe-1dp tasks">
          <md-toolbar>
            <span class="md-title">Tasks</span>
          </md-toolbar>

          <md-table>
            <md-table-header>
              <md-table-row>
                <md-table-head>Task</md-table-head>
                <md-table-head class="task-table-head-timer">Timer</md-table-head>
                <md-table-head class="task-table-head-actions">Actions</md-table-head>
              </md-table-row>
            </md-table-header>

            <transition-group v-if="tasks.length" tag="md-table-body" name="fade-task" mode="in-out">
              <md-table-row class="fade-task-item" :key="task['.key']" v-for="(task, key) in tasks">
                <md-table-cell>{{ task.name }}</md-table-cell>
                <md-table-cell>
                  <span>
                    {{ task.ticks | toTime }}
                    <md-tooltip md-direction="bottom">{{ task.ticks | toMinutes }}</md-tooltip>
                  </span>
                </md-table-cell>
                <md-table-cell>
                  <md-button class="md-raised btn-action md-accent" v-if="!running(task['.key'])" @click.prevent="stopTimer(task['.key'])">Stop</md-button>
                  <md-button class="md-raised btn-action md-primary" v-if="running(task['.key'])" @click.prevent="startTimer(task['.key'])">Start</md-button>
                  <md-button class="md-raised btn-action md-warn" v-if="running(task['.key'])" @click.prevent="removeTask(task['.key'])">Remove</md-button>
                </md-table-cell>
              </md-table-row>
            </transition-group>
          </md-table>
        </md-table-card>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import navbar from '@/components/_navbar'
import firebase from './firebaseInit'

var db = firebase.database()

export default {
  name: 'stopwatch',
  components: {
    navbar
  },
  firebase: {
    firebaseTasks: db.ref('tasks')
  },
  data () {
    return {
      auth: firebase.auth().currentUser,
      task: '',
      timers: []
    }
  },
  computed: {
    tasks () {
      let t
      let tasks = []

      for (t of this.firebaseTasks.filter(task => {
        return this.auth.uid === task.user
      })) tasks.push(t)

      return tasks.reverse()
    }
  },
  methods: {
    addTask () {
      if (this.task !== '') {
        this.$firebaseRefs.firebaseTasks.push({
          user: this.auth.uid,
          name: this.task,
          ticks: 0
        })
        this.task = ''
      }
    },
    startTimer (key) {
      let t

      if (this.timers.findIndex(e => {
        return key === e.key
      }) === -1) {
        this.timers.push({
          key: key,
          timer: null
        })

        t = this.timers.findIndex(task => {
          return key === task.key
        })

        this.timers[t].timer = setInterval(() => {
          this.$firebaseRefs.firebaseTasks.child(key + '/ticks').transaction((ticks) => {
            return ++ticks
          })
        }, 10)

        this.$firebaseRefs.firebaseTasks.child(key + '/history').push({
          action: 'start',
          time: new Date().toJSON()
        })
      }
    },
    stopTimer (key) {
      let t = this.timers.findIndex(e => {
        return key === e.key
      })

      if (t !== -1) {
        clearInterval(this.timers[t].timer)

        this.timers.splice(t, 1)

        this.$firebaseRefs.firebaseTasks.child(key + '/history').push({
          action: 'end',
          time: new Date().toJSON()
        })
      }
    },
    removeTask (key) {
      this.$firebaseRefs.firebaseTasks.child(key).remove()
    },
    running (key) {
      let t = this.timers.findIndex(e => {
        return key === e.key
      })

      return t === -1
    }
  },
  filters: {
    toTime (time) {
      let hr
      let min
      let sec
      let ms

      hr = Math.floor(Math.round(time * 0.01) / 3600) < 10 ? '0' + Math.floor(Math.round(time * 0.01) / 3600) : Math.floor(Math.round(time * 0.01) / 3600)

      min = Math.floor((Math.round(time * 0.01) / 60) % 60) < 10 ? '0' + Math.floor((Math.round(time * 0.01) / 60) % 60) : Math.floor((Math.round(time * 0.01) / 60) % 60)

      sec = Math.round(time * 0.01) % 60 < 10 ? '0' + Math.round(time * 0.01) % 60 : Math.round(time * 0.01) % 60

      ms = time % 100 < 10 ? '0' + time % 100 : time % 100

      return hr + ':' + min + ':' + sec + ' ' + ms
    },
    toMinutes (time) {
      return Math.round((Math.round(time * 0.01) / 60)) === 1 ? Math.round((Math.round(time * 0.01) / 60)) + ' min' : Math.round((Math.round(time * 0.01) / 60)) + ' mins'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .fade-task-item {
    transition: all .5s;
  }

  .fade-task-enter-active, .fade-task-leave-active {
    opacity: 0;
    transform: ease;
  }

  .tasks {
    width: 100%;
  }

  .task-table-head-timer {
    min-width: 130px;
  }

  .task-table-head-actions {
    width: 230px;
    max-width: 230px;
  }

  .btn-action {
    width: auto !important;
    margin: 0;
  }
</style>

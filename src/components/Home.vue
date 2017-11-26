<template>
  <div class="home">
    <navbar :auth="auth"/>
    <md-layout md-align="center">
      <md-layout md-flex="70">
        <md-table-card class="md-whiteframe-1dp tasks">
          <md-toolbar>
            <h1 class="md-title">Tasks</h1>
            <md-button class="md-icon-button">
              <md-icon>filter_list</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>search</md-icon>
            </md-button>
          </md-toolbar>

          <md-table :md-sort="sortTasks.name" :md-sort-type="sortTasks.type" @select="onSelectTasks" @sort="onSortTasks">
            <md-table-header>
              <md-table-row md-selection>
                <md-table-head md-sort-by="id" md-numeric>ID</md-table-head>
                <md-table-head md-sort-by="task">Task</md-table-head>
                <md-table-head md-sort-by="name">Name</md-table-head>
                <md-table-head md-sort-by="created_at">Created at</md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body>
              <md-table-row :key="key" v-for="(task, key) in tasks" :md-item="task" md-selection>
                <md-table-cell key="id" md-numeric>{{ task.id }}</md-table-cell>
                <md-table-cell key="task">{{ task.task }}</md-table-cell>
                <md-table-cell key="user">{{ task.user }}</md-table-cell>
                <md-table-cell key="created_at">{{ task.created_at | toDateString }}</md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>

          <md-table-pagination
            md-size="10"
            :md-total="tasks.length"
            md-page="1"
            md-label="Rows"
            md-separator="of"
            :md-page-options="[5, 10, 25, 50]"
            @pagination="onTasksPagination"/>
        </md-table-card>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import firebase from './firebaseInit'
import navbar from '@/components/_navbar'

var db = firebase.database()

export default {
  name: 'home',
  firebase: {
    tasks: db.ref('tasks')
  },
  data () {
    return {
      auth: firebase.auth().currentUser,
      selectedTasks: [],
      sortTasks: {
        name: 'task',
        type: 'asc'
      },
      pageTasks: {}
    }
  },
  components: {
    navbar
  },
  computed: {
    // orderTasks () {
    //   return this.tasks.
    // }
  },
  methods: {
    onSelectTasks (data) {
      this.selectedTasks = data
      this.$forceUpdate()
    },
    onSortTasks (sort) {
      this.sortTasks = sort
    },
    onTasksPagination (page) {
      this.pageTasks = page
    }
  },
  filters: {
    toDateString (date) {
      let a = new Date(date).toDateString().split(' ')
      a[0] += ','
      a[2] += ','
      return a.join(' ')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tasks {
    width: 100%;
  }
</style>

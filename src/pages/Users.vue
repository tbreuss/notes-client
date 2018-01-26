<template>
    <layout-default v-cloak>
        <h4>Benutzer</h4>
        <span v-if="users.length>0">Zeige {{ users.length }} Benutzer</span>
        <span class="loading" v-if="loading">
            lade Benutzer
        </span>
        <ul class="list-group">
            <router-link v-for="user in users" :to="'/users/' + user.id"
                         class="list-group-item list-group-item-action" :key="user.id">
                {{ user.name }}
            </router-link>
        </ul>
    </layout-default>
</template>

<script>
  import http from '../utils/http'

  export default {
    data () {
      return {
        users: [],
        loading: false
      }
    },
    methods: {
      loadUsers: function () {
        this.loading = true
        var params = {
          sort: this.sort
        }
        http.get('users', params, (users) => {
          this.users = users
          this.loading = false
        })
      }
    },
    mounted: function () {
      this.loadUsers()
    }
  }

</script>

<style scoped>

</style>

<template>
    <layout-default>
        <h4>Benutzer</h4>
        {{ user }}
    </layout-default>
</template>

<script>
  import http from '../utils/http'

  export default {
    props: ['id'],
    data () {
      return {
        user: {},
        loading: false
      }
    },
    methods: {
      loadUser () {
        this.loading = true
        http.get('users/' + this.id, {}, (user) => {
          this.user = user
          this.loading = false
        })
      }
    },
    mounted () {
      this.loadUser()
    }
  }

</script>

<style scoped>

</style>

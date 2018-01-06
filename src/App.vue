<template>
    <router-view></router-view>
</template>

<script>
  import auth from '@/utils/auth'
  export default {
    data () {
      return {
        loggedIn: auth.loggedIn()
      }
    },
    created () {
      auth.onChange = loggedIn => {
        this.loggedIn = loggedIn
      }
    }
  }
</script>

<style scoped>
</style>

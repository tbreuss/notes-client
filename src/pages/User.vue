<template>
    <layout-default>
        <h4>Benutzer</h4>
        {{ user }}
    </layout-default>
</template>

<script>
  import { getUsers } from '../utils/api'

  export default {
    data () {
      return {
        user: {},
        loading: false
      }
    },
    methods: {
      loadData: function () {
        this.loading = true
        var params = {
          sort: this.sort
        }
        getUser(params)
          .then((tags) => {
            this.tags = tags
            this.loading = false
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    created: function () {
      this.loadData()
    }
  }

</script>

<style scoped>

</style>

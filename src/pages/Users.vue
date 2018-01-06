<template>
    <layout-default v-cloak>
        <h4>Benutzer</h4>
        <span v-if="tags.length>0">Zeige {{ tags.length }} Benutzer</span>
        <span class="loading" v-if="loading">
            ...lade Daten
        </span>
        <ul class="list-group">
            <router-link v-for="tag in tags" :to="'/users/' + tag.id"
                         class="list-group-item list-group-item-action" :key="tag.id">
                {{ tag.name }}
            </router-link>
        </ul>
    </layout-default>
</template>

<script>
  import { getUsers } from '../utils/api'

  export default {
    data () {
      return {
        tags: [],
        sort: this.getSort(),
        loading: false
      }
    },
    methods: {
      getSort: function () {
        if (sessionStorage.getItem('UsersPage.sort')) {
          return sessionStorage.getItem('UsersPage.sort')
        }
        return 'name'
      },
      loadData: function () {
        this.loading = true
        var params = {
          sort: this.sort
        }
        getUsers(params)
          .then((tags) => {
            this.tags = tags
            this.loading = false
            sessionStorage.setItem('TagsPage.sort', this.sort)
          })
          .catch(error => {
            console.error(error)
          })
      },
      toArticles: function (tag, e) {
        e.preventDefault()
        sessionStorage.setObj('ArticlesPage.selectedTags', [tag])
        this.$router.push('/articles')
      }
    },
    created: function () {
      this.loadData()
    }
  }

</script>

<style scoped>

</style>

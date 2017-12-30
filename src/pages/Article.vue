<template>
    <div class="loading" v-if="loading">
        Lade...
    </div>
    <div v-else>
        <h1>{{ article.title }}</h1>
        <div class="content">
            <vue-markdown :source="article.content"></vue-markdown>
        </div>
        <div class="tags">
            <article-tags :tags="article.tags"></article-tags>
        </div>
        <div v-if="loggedIn" class="actions text-left">
            <router-link :to="'/articles/' + article.id + '/update'" class="btn btn-primary">
                Artikel bearbeiten
            </router-link>
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteDialog">
                Artikel löschen
            </button>
        </div>
        <modal-dialog :id="'deleteDialog'" @confirm="deleteArticle">
            <p slot="body">Soll der Artikel gelöscht werden?</p>
        </modal-dialog>
    </div>
</template>

<script>
  import { getArticle, deleteArticle } from '../utils/api'
  import auth from '../utils/auth'

  export default {
    props: ['id'],
    data () {
      return {
        loading: false,
        article: {}
      }
    },
    created: function () {
      this.loading = true
      getArticle(this.id)
        .then(article => {
          this.article = article
          this.loading = false
        })
        .catch(e => {
          console.error(e)
        })
    },
    computed: {
      loggedIn () {
        return auth.loggedIn()
      }
    },
    methods: {
      deleteArticle() {
        deleteArticle(this.id)
          .then(() => {
            this.$router.push('/articles')
          })
          .catch(error => {
            console.error(error.response.data)
          })
      }
    }
  }
</script>

<style scoped>

</style>

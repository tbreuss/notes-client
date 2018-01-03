<template>
    <div class="loading" v-if="loading">
        Lade...
    </div>
    <div v-else>
        <h1>{{ article.title }}</h1>

        <div class="content">
            <vue-markdown :postrender="markdownPostRender" @rendered="markdownRendered">{{ article.content }}</vue-markdown>
        </div>
        <div class="tags">
            <article-tags :tags="article.tags"></article-tags>
        </div>
        <div v-if="loggedIn" class="actions text-left">
            <router-link :to="'/articles/' + article.id + '/update'" class="btn btn-primary">
                Eintrag bearbeiten
            </router-link>
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteDialog">
                Eintrag löschen
            </button>
        </div>
        <modal-dialog :id="'deleteDialog'" @confirm="deleteArticle">
            <p slot="body">Soll der Eintrag gelöscht werden?</p>
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
    mounted: function () {
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
      },
      baseUrl() {
        let baseUrl = 'https://kdb-api.tebe.ch/public/media/'
        if (process.env.NODE_ENV == 'development') {
          baseUrl = 'http://localhost:9999/media/'
        }
        return baseUrl
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
      },
      markdownPostRender(value) {
        value = value.replace(new RegExp('src="/media/', 'g'), 'class="img-fluid" src="' + this.baseUrl);
        return value
      },
      markdownRendered() {
        Prism.highlightAll()
      }
    }
  }
</script>

<style scoped>

</style>

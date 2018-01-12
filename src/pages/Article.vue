<template>
    <layout-default>

        <div class="loading" v-if="loading">Lade...</div>

        <h1>{{ article.title }}</h1>

        <div class="content" v-html="parsed"></div>

        <div class="article__tags">

        </div>

        <table class="table table-sm">
            <tr>
                <td width="30%">Tags</td>
                <td><article-tags :tags="article.tags"></article-tags></td>
            </tr>
            <tr>
                <td>Views</td>
                <td>{{ article.views }}</td>
            </tr>
            <tr>
                <td>Likes</td>
                <td>{{ article.likes }}</td>
            </tr>
            <tr>
                <td>Erstellt am</td>
                <td>{{ article.created }}</td>
            </tr>
            <tr>
                <td>Erstellt von</td>
                <td>{{ article.created_by }}</td>
            </tr>
            <tr>
                <td>Geändert am</td>
                <td>{{ article.modified }}</td>
            </tr>
            <tr>
                <td>Geändert von</td>
                <td>{{ article.modified_by }}</td>
            </tr>
        </table>

        <div v-if="loggedIn" class="actions">
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

    </layout-default>
</template>

<script>
  import { getArticle, deleteArticle } from '../utils/api'
  import auth from '../utils/auth'
  import markdown from '../utils/markdown'

  export default {
    props: ['id'],
    data () {
      return {
        loading: false,
        article: {},
        parsed: ''
      }
    },
    mounted: function () {
      this.loading = true
      getArticle(this.id)
        .then(article => {
          this.article = article
          this.loading = false
          this.parsed = markdown.parse(article.content)
          this.$nextTick().then(() => Prism.highlightAll())
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

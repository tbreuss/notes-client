<template>
    <layout-default>

        <div v-if="loading" class="loading">
            Lade...
        </div>
        <div v-else>

            <h1 class="article__title">{{ article.title }}</h1>

            <div class="article__content" v-html="parsed"></div>

            <div class="article__infos">
                <h2>Artikel-Infos</h2>
                <table class="table table-sm">
                    <tr>
                        <td width="30%">Tags</td>
                        <td><article-tags :tags="article.tags"></article-tags></td>
                    </tr>
                    <tr>
                        <td>Views</td>
                        <td>
                            {{ article.views }} Ansichten
                            <span v-if="article.views_date">/ zuletzt gesehen am {{ article.views_date | date }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Likes</td>
                        <td>{{ article.likes }}</td>
                    </tr>
                    <tr v-if="article.created">
                        <td>Erstellt am</td>
                        <td>
                            {{ article.created | date }}
                            <span v-if="article.created_by_user">
                                von {{ article.created_by_user.name }}
                                <span v-if="article.created_by_user.deleted > 0">[gelöschter Benutzer]</span>
                            </span>
                        </td>
                    </tr>
                    <tr v-if="article.modified">
                        <td>Geändert am</td>
                        <td>
                            {{ article.modified | date }}
                            <span v-if="article.modified_by_user.name">
                                von {{ article.modified_by_user.name }}
                                <span v-if="article.modified_by_user.deleted > 0">[gelöschter Benutzer]</span>
                            </span>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="actions">
                <router-link v-if="hasPermission('article.edit', article.created_by)" :to="'/articles/' + article.id + '/update'" class="btn btn-primary actions__button">
                    Eintrag bearbeiten
                </router-link>
                <button v-if="hasPermission('article.delete', article.created_by)" type="button" class="btn btn-danger actions__button" data-toggle="modal" data-target="#deleteDialog">
                    Eintrag löschen
                </button>
                <router-link class="btn btn-secondary actions__button" to="/articles">Zur Übersicht</router-link>
            </div>

            <modal-dialog :id="'deleteDialog'" @confirm="deleteArticle">
                <p slot="body">Soll der Eintrag gelöscht werden?</p>
            </modal-dialog>

        </div>

    </layout-default>
</template>

<script>
  import auth from '../utils/auth'
  import http from '../utils/http'
  import markdown from '../utils/markdown'

  export default {
    props: ['id'],
    data () {
      return {
        loading: false,
        article: {
          created_by_user: {},
          modified_by_user: {},
        },
        parsed: ''
      }
    },
    methods: {
      loadArticle() {
        this.loading = true
        let url = 'articles/' + this.id
        http.get(url, {}, (article) => {
          this.article = article
          this.loading = false
          this.parsed = markdown.parse(article.content)
          this.$nextTick().then(() => Prism.highlightAll())
        })
      },
      deleteArticle() {
        let url = 'articles/' + this.id
        http.delete(url, {}, () => {
          this.$router.push('/articles')
        })
      },
      hasPermission(scope, userId) {
        return auth.hasPermissionForUser(scope, userId)
      }
    },
    mounted: function () {
      this.loadArticle()
    }
  }
</script>

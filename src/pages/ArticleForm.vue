<template>
    <layout-default>
        <h4 v-if="id>0">Eintrag bearbeiten</h4>
        <h4 v-else>Eintrag hinzufügen</h4>
        <div v-if="loading" class="loading">
            Lade...
        </div>
        <div v-else>
            <div class="form-group">
                <label for="title">Titel</label>
                <input v-model="article.title" type="text" :class="getClass('title')" id="title" v-focus>
                <div class="invalid-feedback">{{ errors.title }}</div>
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea-upload :url="'/upload'" v-model="article.content" :class="getClass('content')" id="content" rows="10"
                                 cols="10"></textarea-upload>

                <small class="float-right">
                    <button @click.prevent="parseMarkdown" type="button" class="btn btn-sm" data-toggle="modal" data-target="#previewModal">
                        Vorschau
                    </button>
                </small>
                <small id="contentHelp" class="form-text text-muted">Markdown-Syntax</small>
                <div class="invalid-feedback">{{ errors.content }}</div>
            </div>
            <div class="form-group">
                <label for="tags">Tags</label>
                <input v-model="article.tags" type="text" :class="getClass('tags')" id="tags">
                <small id="tagsHelp" class="form-text text-muted">Mehrere Tags kommagetrennt</small>
                <div class="invalid-feedback">{{ errors.tags }}</div>
            </div>
            <div v-if="id>0" class="actions">
                <button v-if="hasPermissionForUser('article.edit', article.created_by)" type="button" class="btn btn-primary actions__button" @click="save" ref="submit">Eintrag speichern</button>
                <button v-if="hasPermissionForUser('article.delete', article.created_by)" type="button" class="btn btn-danger actions__button" data-toggle="modal" data-target="#deleteDialog" ref="delete">Eintrag löschen</button>
                <button type="button" class="btn btn-secondary actions__button" @click="cancel" ref="cancel">Abbrechen</button>
            </div>
            <div v-if="!id" class="actions">
                <button v-if="hasPermission('article.add')" type="button" class="btn btn-primary actions__button" @click="save" ref="submit">Eintrag speichern</button>
                <button v-if="hasPermission('article.add')" type="button" class="btn btn-secondary actions__button" @click="reset">Zurücksetzen</button>
                <button type="button" class="btn btn-secondary actions__button" @click="cancel" ref="cancel">Abbrechen</button>
            </div>
        </div>

        <modal-dialog :id="'deleteDialog'" @confirm="deleteArticle">
            <p slot="body">Soll der Eintrag gelöscht werden?</p>
        </modal-dialog>

        <!-- Modal -->
        <div class="modal" id="previewModal" tabindex="-1" role="dialog" aria-labelledby="previewModalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="previewModalLabel">Vorschau: {{ article.title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="article.content.trim()==''">Kein Content erfasst</div>
                        <div class="markdown" v-html="parsed"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Schliessen</button>
                    </div>
                </div>
            </div>
        </div>
    </layout-default>
</template>

<script>
  import { getArticle, postArticle, putArticle, deleteArticle } from '@/utils/api'
  import auth from '@/utils/auth'
  import markdown from '@/utils/markdown'

  export default {
    props: ['id'],
    data () {
      return {
        loading: false,
        article: {
          title: '',
          content: '',
          tags: ''
        },
        parsed: '',
        errors: {},
        formSent: false
      }
    },
    computed: {},
    methods: {
      cancel() {
        if (this.id) {
          this.$router.push('/articles/' + this.id)
        } else {
          this.$router.push('/articles')
        }
      },
      deleteArticle() {
        deleteArticle(this.id)
          .then(() => {
            this.$router.push('/articles')
          })
          .catch(error => {
            console.error(error.response.data)
          })
      },
      reset: function () {
        this.formSent = false
        this.article = {
          title: '',
          content: '',
          tags: ''
        }
      },
      save() {
        this.$refs.submit.disabled = true
        this.formSent = true
        let article = this.getArticle()
        if (this.id > 0) {
          this.update(article)
        } else {
          this.insert(article)
        }
      },
      insert: function (article) {
        postArticle(article)
          .then(() => {
            this.$refs.submit.disabled = false
            this.$router.push('/articles')
          })
          .catch(error => {
            this.errors = error.response.data
            this.$refs.submit.disabled = false
          })
      },
      update: function (article) {
        putArticle(this.id, article)
          .then(() => {
            this.$refs.submit.disabled = false
            this.$router.push('/articles/' + this.id)
          })
          .catch(error => {
            this.errors = error.response.data
            this.$refs.submit.disabled = false
          })
      },
      getClass: function (field) {
        if (!this.formSent) {
          return 'form-control'
        }
        if (field in this.errors) {
          return 'form-control is-invalid'
        }
        return 'form-control is-valid'
      },
      getArticle () {
        return {
          title: this.article.title,
          content: this.article.content,
          tags: this.article.tags
        }
      },
      setArticle (article) {
        this.article = {
          title: article.title,
          content: article.content,
          tags: Array.isArray(article.tags) ? article.tags.join(',') : article.tags,
          created: article.created,
          created_by: article.created_by
        }
      },
      parseMarkdown() {
        this.parsed = markdown.parse(this.article.content)
        this.$nextTick().then(() => Prism.highlightAll())
      },
      hasPermission(scope) {
        return auth.hasPermission(scope)
      },
      hasPermissionForUser(scope, userId) {
        return auth.hasPermissionForUser(scope, userId)
      }
    },
    created () {
      if (this.id === undefined) {
        return
      }
      this.loading = true
      getArticle(this.id)
        .then(article => {
          this.setArticle(article)
          this.loading = false
        })
        .catch(e => {
          console.error(e)
        })
    }
  }

</script>

<style scoped>

</style>

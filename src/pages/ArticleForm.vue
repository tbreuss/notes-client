<template>
    <div>
        <h4 v-if="id>0">Artikel bearbeiten</h4>
        <h4 v-else>Artikel hinzufügen</h4>
        <div class="loading" v-if="loading">
            Lade...
        </div>
        <div v-else>
            <div class="form-group">
                <label for="title">Titel</label>
                <input v-model="article.title" type="text" :class="getClass('title')" id="title" v-focus>
                <div class="invalid-feedback">{{ errors.title }}</div>
            </div>
            <div class="form-group">
                <label for="abstract">Abstract</label>
                <textarea v-model="article.abstract" :class="getClass('abstract')" id="abstract"></textarea>
                <div class="invalid-feedback">{{ errors.abstract }}</div>
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea v-model="article.content" :class="getClass('content')" id="content" rows="10"
                          cols="10"></textarea>
                <small class="float-right">
                    <button type="button" class="btn btn-sm btn-link" data-toggle="modal" data-target="#previewModal">
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
            <button type="button" class="btn btn-primary" @click="save" ref="submit">Speichern</button>
            <button v-show="id>0" type="button" class="btn btn-link" @click="cancel" ref="cancel">Abbrechen</button>
            <button v-show="id==0" type="button" class="btn btn-link" @click="reset" ref="reset">Zurücksetzen</button>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="previewModal" tabindex="-1" role="dialog" aria-labelledby="previewModalLabel"
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
                        <vue-markdown v-else :source="article.content"></vue-markdown>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Schliessen</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { getArticle, postArticle, putArticle } from '../utils/api'

  export default {
    props: ['id'],
    data () {
      return {
        loading: false,
        article: {
          title: '',
          abstract: '',
          content: '',
          tags: ''
        },
        errors: {},
        formSent: false
      }
    },
    computed: {},
    methods: {
      cancel() {
        this.$router.push('/article/' + this.id)
      },
      reset: function () {
        this.formSent = false
        this.article = {
          title: '',
          abstract: '',
          content: '',
          tags: ''
        }
      },
      save() {
        this.$refs.reset.disabled = true
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
            this.$refs.reset.disabled = false
            this.$refs.submit.disabled = false
            this.$router.push('/articles')
          })
          .catch(error => {
            this.errors = error.response.data
            this.$refs.reset.disabled = false
            this.$refs.submit.disabled = false
          })
      },
      update: function (article) {
        putArticle(this.id, article)
          .then(() => {
            this.$refs.reset.disabled = false
            this.$refs.submit.disabled = false
            this.$router.push('/article/' + this.id)
          })
          .catch(error => {
            this.errors = error.response.data
            this.$refs.reset.disabled = false
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
          abstract: this.article.abstract,
          content: this.article.content,
          tags: this.article.tags
        }
      },
      setArticle (article) {
        this.article = {
          title: article.title,
          abstract: article.abstract,
          content: article.content,
          tags: Array.isArray(article.tags) ? article.tags.join(',') : article.tags
        }
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

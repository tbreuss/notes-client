<template>
    <div>
        <h4>Artikel hinzufügen</h4>
        <div class="form-group">
            <label for="title">Titel</label>
            <input v-model="article.title" type="text" :class="getClass('title')" id="title" ref="title">
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
        <button type="button" class="btn btn-primary" @click="submit" ref="submit">Speichern</button>
        <button type="button" class="btn btn-link" @click="reset" ref="reset">Zurücksetzen</button>

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
  import { HTTP } from '../http'

  export default {
    data () {
      return {
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
      reset: function () {
        this.formSent = false
        this.article = {
          title: '',
          abstract: '',
          content: '',
          tags: ''
        }
      },
      submit: function () {
        this.$refs.reset.disabled = true
        this.$refs.submit.disabled = true
        this.formSent = true
        var config = {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }
        HTTP.post('add-article', this.article, config)
          .then(response => {
            this.$refs.reset.disabled = false
            this.$refs.submit.disabled = false
            var success = response.data.success
            if (!success) {
              this.errors = response.data.errors
            } else {
              this.$router.push('/articles')
            }
          })
          .catch(e => {
            console.error(e)
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
      }
    },
    created: function () {
      this.$nextTick(function () {
        var jwt = localStorage.getItem('token')
        if (!jwt) {
          this.$router.push('/login')
        }
        this.$refs.title.focus()
      })
    }
  }

</script>

<style scoped>

</style>

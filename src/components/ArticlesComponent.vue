<template>
    <div v-cloak>
        <h4>{{ title }}</h4>
        <div class="loading" v-if="loading">
            Lade...
        </div>
        <div v-else>
            <div class="row">
                <div class="col-lg-12">
                    <div class="list-group">
                        <router-link v-for="article in articles" :to="'/article/' + article.id"
                                     class="list-group-item d-flex justify-content-between align-items-center"
                                     :key="article.id">{{ article.title }}
                            <span v-if="article.views" class="badge badge-secondary">{{ article.views }}</span>
                            <span v-if="article.modified" class="badge badge-secondary">{{ article.modified | date
                                }}</span>
                            <span v-if="article.created" class="badge badge-secondary">{{ article.created | date
                                }}</span>
                        </router-link>
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
        articles: [],
        loading: false
      }
    },
    computed: {
      title: function () {
        if (this.mode == 'popular') {
          return 'Die beliebtesten Artikel'
        }
        if (this.mode == 'latest') {
          return 'Die neuesten Artikel'
        }
        if (this.mode == 'modified') {
          return 'Die aktuellsten Artikel'
        }
        return ''
      },
      endpoint: function () {
        if (this.mode == 'popular') {
          return 'popular'
        }
        if (this.mode == 'latest') {
          return 'latest'
        }
        if (this.mode == 'modified') {
          return 'modified'
        }
        return 'latest'
      }
    },
    props: ['mode'],
    methods: {
      loadData: function () {
        this.loading = true
        HTTP.get(this.endpoint)
          .then(response => {
            this.articles = response.data
            this.loading = false
          })
          .catch(e => {
            console.error(e)
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

<template>
    <div>
        <slot name="title"><h4>Einträge</h4></slot>
        <div class="loading" v-if="loading">
            Lade...
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="list-group">
                    <router-link v-for="article in articles" :to="'/articles/' + article.id"
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
</template>

<script>
  import { getSelectedArticles } from '../utils/api'

  export default {
    data () {
      return {
        articles: [],
        loading: false
      }
    },
    props: ['mode'],
    methods: {
      loadData: function () {
        this.loading = true
        getSelectedArticles(this.mode)
          .then(articles => {
            this.articles = articles
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

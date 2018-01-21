<template>
    <div class="widget-articles">
        <slot name="title"><h4>Einträge</h4></slot>
        <div class="loading" v-if="loading">
            Lade...
        </div>
        <div class="list-group">
            <router-link v-for="article in articles" :to="'/articles/' + article.id"
                         class="list-group-item d-flex justify-content-between align-items-center"
                         :key="article.id">{{ article.title }}
                <span v-if="article.views" class="badge badge-secondary">{{ article.views }}</span>
                <span v-if="article.likes" class="badge badge-secondary">{{ article.likes }}</span>
                <span v-if="article.modified" class="badge badge-secondary">{{ article.modified | date
                    }}</span>
                <span v-if="article.created" class="badge badge-secondary">{{ article.created | date
                    }}</span>
            </router-link>
        </div>
    </div>
</template>

<script>
  import http from '../utils/http'

  export default {
    data () {
      return {
        articles: [],
        loading: false
      }
    },
    props: ['mode'],
    methods: {
      loadArticles () {
        this.loading = true
        http.get(this.getUrl(), {}, (articles) => {
          this.articles = articles
          this.loading = false
        })
      },
      getUrl () {
        let url = 'latest'
        if (this.mode == 'popular') {
          url = 'popular'
        }
        if (this.mode == 'latest') {
          url = 'latest'
        }
        if (this.mode == 'modified') {
          url = 'modified'
        }
        if (this.mode == 'liked') {
          url = 'liked'
        }
        return url
      }
    },
    mounted () {
      this.loadArticles()
    }
  }

</script>

<style scoped>

</style>

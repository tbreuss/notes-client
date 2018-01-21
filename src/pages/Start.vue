<template>
    <layout-start>
        <div class="col-md-12 search">
            <input @change="searchArticles" type="text" v-model="term" class="form-control form-control-lg" placeholder="Einträge suchen..." v-focus>
        </div>

        <div class="col-md-6">
            <articles :mode="'popular'"><h4 slot="title" class="widget-articles__title">Die meist gesehenen Einträge</h4></articles>
        </div>
        <div class="col-md-6">
            <articles :mode="'latest'"><h4 slot="title" class="widget-articles__title">Die neuesten Einträge</h4></articles>
        </div>
        <div class="col-md-6">
            <articles :mode="'modified'"><h4 slot="title" class="widget-articles__title">Die aktuellsten Einträge</h4></articles>
        </div>
        <div class="col-md-6">
            <articles :mode="'liked'"><h4 slot="title" class="widget-articles__title">Die beliebtesten Einträge</h4></articles>
        </div>
    </layout-start>
</template>

<script>
  import storage from '../utils/storage'
  export default {
    name: 'StartPage',
    data () {
      return {
        term: ''
      }
    },
    methods: {
      searchArticles () {
        storage.setArticlesSearch(this.term)
        this.$router.push('articles')
      }
    }
  }
</script>

<style scoped>
    .search {
        margin-bottom: 2rem;
    }
</style>

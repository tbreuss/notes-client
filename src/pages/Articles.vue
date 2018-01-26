<template>
    <layout-default>

        <div class="articles__search">
            <input @change="loadArticles(true)" type="text" v-model="q" class="form-control form-control-lg articles__searchfield" placeholder="Einträge suchen..." v-focus>
        </div>

        <div class="paging-text">
            <span v-show="articles.length>0">
                Zeige {{ pagingFrom }} bis {{ pagingTo }} von {{ paging.totalItems }} Einträgen
            </span>
            <span class="paging-text__loading" v-show="loading">
                lade Einträge
            </span>
        </div>

        <div v-if="!loading && articles.length==0">Keine Einträge gefunden</div>

        <div class="list-group">
            <router-link v-for="article in articles" :to="'/articles/' + article.id"
                         class="list-group-item list-group-item-action" :key="article.id">
                {{ article.title }}<br>
                <article-tags :tags="article.tags"></article-tags>
            </router-link>
            <nav style="margin-top:20px" v-if="paging.pageCount>1">
                <ul class="pagination justify-content-center">
                    <li v-bind:class="{ disabled: paging.currentPage <= 1, 'page-item': true}"><a
                            class="page-link" @click="loadPrevPage" href="#">Vorherige Seite</a></li>
                    <li v-bind:class="{ disabled: paging.currentPage >= paging.pageCount, 'page-item': true}">
                        <a class="page-link" @click="loadNextPage" href="#">Nächste Seite</a></li>
                </ul>
            </nav>
        </div>

        <div slot="aside">
            <div class="aside-sort">
                <h4 class="aside-sort__title">Sortieren nach</h4>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" id="articles-sort-radio-1" @change="loadArticles" type="radio" value="title" v-model="sort">
                    <label class="custom-control-label" for="articles-sort-radio-1">Titel</label>
                </div>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" id="articles-sort-radio-2" @change="loadArticles" type="radio" value="popular" v-model="sort">
                    <label class="custom-control-label" for="articles-sort-radio-2">Beliebtheit</label>
                </div>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" id="articles-sort-radio-3" @change="loadArticles" type="radio" value="changed" v-model="sort">
                    <label class="custom-control-label" for="articles-sort-radio-3">Letzter Änderung</label>
                </div>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" id="articles-sort-radio-4" @change="loadArticles" type="radio" value="created" v-model="sort">
                    <label class="custom-control-label" for="articles-sort-radio-4">Letzter Eintrag</label>
                </div>
            </div>
            <div class="aside-tags" v-if="tags.length > 0">
                <h4 class="aside-tags__title">Tags</h4>
                <div v-for="(tag, index) in tags" class="custom-control custom-checkbox">
                    <input class="custom-control-input" :id="'aside-tags__check--' + index" @change="loadArticles" type="checkbox" :value="tag" v-model="selectedTags">
                    <label class="custom-control-label" :for="'aside-tags__check--' + index">{{ tag }}</label>
                </div>
            </div>
        </div>
    </layout-default>
</template>

<script>
  import http from '../utils/http'
  import storage from '../utils/storage'

  export default {
    name: 'ArticlesPage',
    data () {
      return {
        loading: false,
        articles: [],
        tags: [],
        q: storage.getArticlesSearch(),
        sort: storage.getArticlesSort(),
        page: storage.getArticlesPage(),
        paging: {},
        selectedTags: storage.getArticlesTags(),
      }
    },
    computed: {
      pagingFrom: function () {
        return (this.paging.currentPage - 1) * this.paging.itemsPerPage + 1
      },
      pagingTo: function () {
        return Math.min(this.paging.currentPage * this.paging.itemsPerPage, this.paging.totalItems)
      }
    },
    methods: {
      loadArticles (resetPage = false) {
        var params = {}
        if (this.q) {
          params.q = this.q
        }
        if (this.selectedTags) {
          params.tags = this.selectedTags
        }
        if (this.sort) {
          params.sort = this.sort
        }
        if (resetPage) {
          this.page = 1
        }
        params.page = this.page
        this.loading = true
        http.get('articles', {params: params}, (data) => {
          this.articles = data.articles
          this.paging = data.paging
          this.loading = false
          storage.setArticlesPage(this.page)
          storage.setArticlesSearch(this.q)
          storage.setArticlesSort(this.sort)
          this.loadTags()
        })
      },
      loadPrevPage: function (event) {
        event.preventDefault()
        this.page = this.paging.currentPage - 1
        this.loadArticles()
      },
      loadNextPage: function (event) {
        event.preventDefault()
        this.page = this.paging.currentPage + 1
        this.loadArticles()
      },
      loadTags: function () {
        var params = {}
        if (this.q) {
          params.q = this.q
        }
        if (this.selectedTags) {
          params.tags = this.selectedTags
        }
        http.get('selectedtags', {params: params}, (tags) => {
          this.tags = tags
          storage.setArticlesTags(this.selectedTags)
        })
      }
    },
    mounted () {
      this.loadArticles()
    }
  }

</script>

<style scoped>

</style>
